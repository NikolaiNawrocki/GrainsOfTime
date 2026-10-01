import type { StructureResolver } from "sanity/structure";
import {
  Home,
  BookOpen,
  Users,
  UserCheck,
  GraduationCap,
  CalendarDays,
  CalendarCheck,
  FileClock,
  Archive,
  ImageIcon,
  Music,
  ListMusic,
  Disc3,
  Clock,
  Inbox,
  MailCheck,
  Settings,
  FileText,
} from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website Content Manager")
    .items([
      // 1. Homepage (Singleton)
      S.listItem()
        .title("Homepage")
        .icon(Home)
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Edit Homepage")
        ),

      // 2. About Us (Singleton)
      S.listItem()
        .title("About Us")
        .icon(BookOpen)
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("aboutPage")
            .title("Edit About Page")
        ),

      S.divider(),

      // 3. Members & Roster
      S.listItem()
        .title("Members & Alumni")
        .icon(Users)
        .child(
          S.list()
            .title("Roster Management")
            .items([
              S.listItem()
                .title("Current Active Members")
                .icon(UserCheck)
                .child(
                  S.documentList()
                    .title("Active Roster")
                    .schemaType("member")
                    .filter('_type == "member" && status == "active"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("Alumni Archive")
                .icon(GraduationCap)
                .child(
                  S.documentList()
                    .title("Alumni")
                    .schemaType("member")
                    .filter('_type == "member" && status == "alumni"')
                    .defaultOrdering([{ field: "graduationYear", direction: "desc" }])
                ),
              S.listItem()
                .title("All Member Records")
                .icon(Users)
                .child(S.documentTypeList("member").title("All Members")),
            ])
        ),

      // 4. Events & Concerts
      S.listItem()
        .title("Concerts & Events")
        .icon(CalendarDays)
        .child(
          S.list()
            .title("Events Management")
            .items([
              S.listItem()
                .title("Upcoming & Live Events")
                .icon(CalendarCheck)
                .child(
                  S.documentList()
                    .title("Upcoming Events")
                    .filter('_type == "event" && status in ["published", "sold_out"]')
                    .defaultOrdering([{ field: "startDate", direction: "asc" }])
                ),
              S.listItem()
                .title("Drafts & Unannounced")
                .icon(FileClock)
                .child(
                  S.documentList()
                    .title("Draft Events")
                    .filter('_type == "event" && status == "draft"')
                    .defaultOrdering([{ field: "startDate", direction: "asc" }])
                ),
              S.listItem()
                .title("Past Concerts Archive")
                .icon(Archive)
                .child(
                  S.documentList()
                    .title("Past Concerts")
                    .filter('_type == "event" && status == "archived"')
                    .defaultOrdering([{ field: "startDate", direction: "desc" }])
                ),
              S.listItem()
                .title("All Events")
                .icon(CalendarDays)
                .child(S.documentTypeList("event").title("All Events")),
            ])
        ),

      // 5. Photo Gallery
      S.listItem()
        .title("Photo Gallery")
        .icon(ImageIcon)
        .child(
          S.documentTypeList("galleryItem")
            .title("Photo Gallery")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),

      // 6. Repertoire / Songs
      S.listItem()
        .title("Repertoire (Our Songs)")
        .icon(Music)
        .child(
          S.list()
            .title("Repertoire Management")
            .items([
              S.listItem()
                .title("Current Concert Setlist")
                .icon(ListMusic)
                .child(
                  S.documentList()
                    .title("Current Setlist")
                    .filter('_type == "repertoireItem" && status == "current"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("Past Arrangements")
                .icon(Archive)
                .child(
                  S.documentList()
                    .title("Past Songs")
                    .filter('_type == "repertoireItem" && status == "archived"')
                    .defaultOrdering([{ field: "title", direction: "asc" }])
                ),
              S.listItem()
                .title("All Songs")
                .icon(Music)
                .child(
                  S.documentTypeList("repertoireItem")
                    .title("All Songs")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
            ])
        ),

      // 7. Discography & Releases
      S.listItem()
        .title("Music & Recordings")
        .icon(Disc3)
        .child(
          S.documentTypeList("musicRelease")
            .title("Discography")
            .defaultOrdering([{ field: "releaseYear", direction: "desc" }])
        ),

      // 8. Living Archive / History
      S.listItem()
        .title("Our History (Timeline)")
        .icon(Clock)
        .child(
          S.documentTypeList("timelineEntry")
            .title("Historical Milestones")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      S.divider(),

      // 9. Booking Inquiries
      S.listItem()
        .title("Booking Requests")
        .icon(Inbox)
        .child(
          S.list()
            .title("Performance Inquiries")
            .items([
              S.listItem()
                .title("New / Unread Requests")
                .icon(Inbox)
                .child(
                  S.documentList()
                    .title("New Requests")
                    .filter('_type == "bookingInquiry" && inquiryStatus == "new"')
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                ),
              S.listItem()
                .title("In Communication")
                .icon(MailCheck)
                .child(
                  S.documentList()
                    .title("In Progress")
                    .filter('_type == "bookingInquiry" && inquiryStatus == "contacted"')
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                ),
              S.listItem()
                .title("All Booking Requests")
                .icon(Inbox)
                .child(
                  S.documentTypeList("bookingInquiry")
                    .title("All Inquiries")
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                ),
            ])
        ),

      S.divider(),

      // 10. Website Settings (Singleton)
      S.listItem()
        .title("Website Settings")
        .icon(Settings)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Website Settings & Social Links")
        ),

      // 11. Custom Pages
      S.listItem()
        .title("Custom Pages")
        .icon(FileText)
        .child(
          S.documentTypeList("page")
            .title("Custom Editorial Pages")
        ),
    ]);
