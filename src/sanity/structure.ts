import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Grains of Time Content Studio")
    .items([
      // Singleton: Site Settings
      S.listItem()
        .title("Site Settings & Navigation")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),

      S.divider(),

      // Ensemble Members & Sections
      S.listItem()
        .title("Current Ensemble & Alumni")
        .child(
          S.list()
            .title("Roster Management")
            .items([
              S.listItem()
                .title("Active Ensemble")
                .child(
                  S.documentList()
                    .title("Active Members")
                    .filter('_type == "member" && status == "active"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("Alumni Archive")
                .child(
                  S.documentList()
                    .title("Alumni")
                    .filter('_type == "member" && status == "alumni"')
                    .defaultOrdering([{ field: "graduationYear", direction: "desc" }])
                ),
              S.listItem()
                .title("All Records")
                .child(S.documentTypeList("member").title("All Members")),
            ])
        ),

      // Events & Concerts
      S.listItem()
        .title("Concerts & Events")
        .child(
          S.list()
            .title("Events Management")
            .items([
              S.listItem()
                .title("Upcoming & Active")
                .child(
                  S.documentList()
                    .title("Upcoming Events")
                    .filter('_type == "event" && status in ["published", "sold_out"]')
                    .defaultOrdering([{ field: "startDate", direction: "asc" }])
                ),
              S.listItem()
                .title("Drafts & Unannounced")
                .child(
                  S.documentList()
                    .title("Draft Events")
                    .filter('_type == "event" && status == "draft"')
                ),
              S.listItem()
                .title("Past Concerts Archive")
                .child(
                  S.documentList()
                    .title("Archived Concerts")
                    .filter('_type == "event" && status == "archived"')
                    .defaultOrdering([{ field: "startDate", direction: "desc" }])
                ),
            ])
        ),

      // Living Archive Timeline
      S.listItem()
        .title("Living Archive / Timeline")
        .child(
          S.documentTypeList("timelineEntry")
            .title("Timeline Milestones")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      // Photo Gallery
      S.documentTypeListItem("galleryItem").title("Photo Gallery"),

      // Repertoire
      S.documentTypeListItem("repertoireItem").title("Repertoire & Setlists"),

      // Discography
      S.documentTypeListItem("musicRelease").title("Discography & Releases"),

      S.divider(),

      // Booking Inquiries
      S.listItem()
        .title("Booking Inquiries")
        .child(
          S.list()
            .title("Inquiries")
            .items([
              S.listItem()
                .title("New / Unread")
                .child(
                  S.documentList()
                    .title("New Inquiries")
                    .filter('_type == "bookingInquiry" && inquiryStatus == "new"')
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                ),
              S.listItem()
                .title("All Inquiries")
                .child(
                  S.documentTypeList("bookingInquiry")
                    .title("All Booking Inquiries")
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                ),
            ])
        ),

      // Reusable Pages
      S.documentTypeListItem("page").title("Modular Pages"),
    ]);
