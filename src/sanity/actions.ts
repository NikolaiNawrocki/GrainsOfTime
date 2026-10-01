import { DocumentActionComponent, DocumentActionsContext } from 'sanity';

export function resolveDocumentActions(
  prev: DocumentActionComponent[],
  context: DocumentActionsContext
): DocumentActionComponent[] {
  // For booking inquiries, only show minimal actions
  if (context.schemaType === 'bookingInquiry') {
    // Keep only the publish action for status updates
    return prev.filter(
      (action) => action.action === 'publish' || action.action === 'discardChanges'
    );
  }
  
  return prev;
}
