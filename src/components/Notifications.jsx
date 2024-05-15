  import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    MoreVertical,
    Truck,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Pagination,
    PaginationContent,
    PaginationItem,
  } from "@/components/ui/pagination"
  import { Separator } from "@/components/ui/separator"
  import Notification from "@/components/Notification"
  import { supabase } from "@/utils/supabase"
  import { useState, useEffect } from "react"


  

  
  
  export default function Component() {
  const [notifications, setNotifications] = useState([]);

  const changes = supabase
  .channel('table-db-changes')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
    },
    (payload) => setNotifications([payload.new, ...notifications])
  )
  .subscribe()

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notifications:", error);
      return;
    }
    console.log(data)
    setNotifications(data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);



    return (
    <div className="w-full max-w-md">
        <Card className="overflow-hidden ">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Notifications
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-0 text-sm *:mb-2">
            {notifications.map((notification) => (
                <Notification key={notification.id} notification={notification} />
            ))}       

        </CardContent>
      </Card>
    </div>
      
    )
  }
  