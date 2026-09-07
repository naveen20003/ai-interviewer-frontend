import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentGroup,
  AttachmentTrigger
} from "@/components/ui/attachment";


function DocsAttachments({ files, XIcon }) {
  return (
    <AttachmentGroup className="w-full flex justify-center">
        {files.map((file) => (
          <Attachment key={file.name} orientation="vertical">
            <AttachmentMedia variant="image">
              <img src={file.preview} onLoad={() => URL.revokeObjectURL(file.preview)} alt={file.name}/>
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file.name}</AttachmentTitle>
              <AttachmentDescription>{file.meta}</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label={`Remove ${file.name}`}>
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
            <AttachmentTrigger
              render={
                <a
                  href={file.src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${file.name}`}
                />
              }
            />
          </Attachment>
        ))}
      </AttachmentGroup>
  )
}

export default DocsAttachments;