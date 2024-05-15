import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function NotificationLiveRequest({ notification }) {
  return (
    <Card className="overflow-hidden p-0 hover:bg-muted/50 hover:cursor-pointer">
      <CardHeader className="py-4">
        <CardTitle className="text-base">{notification.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 pt-0 mt-0">
        <p className="text-sm text-muted-foreground">{notification.description}</p>
      </CardContent>
    </Card>
  )
}

function NotificationMessageDialog({ notification }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden p-0 hover:bg-muted/50 hover:cursor-pointer">
          <CardHeader className="py-4">
            <CardTitle className="text-base">{notification.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 pt-0 mt-0">
            <p className="text-sm text-muted-foreground">{notification.description}</p>
          </CardContent>
          <CardFooter className="pb-2">
            <p className="text-xs text-muted-foreground">
              {format(new Date(notification.created_at), "PPP")}
            </p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{notification.message_title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">{notification.message_content}</p>
        </div>
        <p className="text-xs text-muted-foreground">{notification.message_sender || "Abubakar"}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Dismiss</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function NotificationCard({ notification }) {
    return (
      <Card className="overflow-hidden p-0">
      <CardHeader className="py-4">
        <CardTitle className="text-base">{notification.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 pt-0 mt-0">
        <p className="text-sm text-muted-foreground">{notification.description}</p>
      </CardContent>
      <CardFooter className="pb-2">
        <p className="text-xs text-muted-foreground">
          {format(new Date(notification.created_at), "PPP")}
        </p>
      </CardFooter>
    </Card>
    )
}

function Notification({ notification }) {
      if (notification.type === "message") {
      return <NotificationMessageDialog notification={notification} />
    } else {
      return <NotificationCard notification={notification} />
    }
}

export default Notification;
