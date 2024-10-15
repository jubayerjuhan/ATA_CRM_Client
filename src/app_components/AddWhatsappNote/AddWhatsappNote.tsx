import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { client } from "@/api/api";

interface Note {
  text: string;
}

export const AddWhatsappNote = ({ lead }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting note:", noteContent, lead._id);

    try {
      const response = await client.post(`/whatsapp-leads/${lead._id}/notes`, {
        note: noteContent,
      });
      console.log("Note added successfully:", response.data);
      setIsOpen(false);
      setNoteContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Note</DialogTitle>
          <DialogDescription>
            Add a new note to this WhatsApp lead. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="note" className="text-right">
                Note
              </Label>
              <Textarea
                id="note"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="col-span-3"
                rows={4}
                placeholder="Enter your note here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Note</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
