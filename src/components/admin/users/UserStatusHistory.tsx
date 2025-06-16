import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, FileText, User } from "lucide-react";

interface StatusLog {
  id: string;
  status: string;
  description?: string;
  createdAt: string;
  observer?: {
    name: string;
  };
}

interface UserStatusHistoryProps {
  statusLogs?: StatusLog[];
}

export function UserStatusHistory({ statusLogs }: UserStatusHistoryProps) {
  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (
      lowerStatus.includes("نشط") ||
      lowerStatus.includes("مكتمل") ||
      lowerStatus.includes("active") ||
      lowerStatus.includes("completed")
    ) {
      return "bg-green-500 dark:bg-green-400";
    } else if (
      lowerStatus.includes("معلق") ||
      lowerStatus.includes("انتظار") ||
      lowerStatus.includes("pending") ||
      lowerStatus.includes("waiting")
    ) {
      return "bg-yellow-500 dark:bg-yellow-400";
    } else if (
      lowerStatus.includes("ملغي") ||
      lowerStatus.includes("فشل") ||
      lowerStatus.includes("cancelled") ||
      lowerStatus.includes("failed")
    ) {
      return "bg-red-500 dark:bg-red-400";
    }
    return "bg-blue-500 dark:bg-blue-400";
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("ar-SA", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="w-full shadow-sm border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-foreground">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <span className="text-lg font-semibold">تاريخ الحالة</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {statusLogs && statusLogs.length > 0 ? (
          <ScrollArea className="h-96 w-full pr-4">
            <div className="space-y-0">
              {[...statusLogs].reverse().map((log, index) => {
                const reversedIndex = statusLogs.length - 1 - index;
                return (
                  <div key={log.id} className="relative">
                    {/* Timeline line */}
                    {reversedIndex > 0 && (
                      <div className="absolute right-[7px] top-8 w-0.5 h-16 bg-border/30 dark:bg-border/50" />
                    )}

                    <div className="flex items-start gap-4 pb-6">
                      {/* Status indicator with enhanced design */}
                      <div className="flex-shrink-0 relative">
                        {/* Outer ring for latest status */}
                        {index === 0 && (
                          <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/20 dark:bg-primary/30 animate-pulse" />
                        )}
                        <div
                          className={`w-4 h-4 rounded-full ${getStatusColor(
                            log.status
                          )} shadow-sm ring-2 ring-background dark:ring-background relative z-10`}
                        >
                          {/* Dot for latest status */}
                          {index === 0 && (
                            <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900" />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Status badge with enhanced styling for latest */}
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                            index === 0
                              ? "bg-primary/10 dark:bg-primary/20 text-primary border-primary/30 shadow-sm"
                              : "bg-secondary/80 dark:bg-secondary/60 text-secondary-foreground border-border/50"
                          }`}
                        >
                          {index === 0 && (
                            <span className="mr-2 text-xs">🔥</span>
                          )}
                          {log.status}
                          {index === 0 && (
                            <span className="mr-1 text-xs font-normal opacity-70">
                              {" "}
                              (أحدث)
                            </span>
                          )}
                        </div>

                        {/* Description with enhanced styling for latest */}
                        {log.description && (
                          <div
                            className={`flex items-start gap-2 p-3 rounded-lg border ${
                              index === 0
                                ? "bg-primary/5 dark:bg-primary/10 border-primary/20"
                                : "bg-muted/30 dark:bg-muted/20 border-border/30"
                            }`}
                          >
                            <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {log.description}
                            </p>
                          </div>
                        )}

                        {/* Metadata */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatDate(log.createdAt)}</span>
                          </div>
                          {log.observer && (
                            <>
                              <span className="text-border">•</span>
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>بواسطة {log.observer.name}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 dark:bg-muted/30">
              <Clock className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-muted-foreground font-medium">
                لا يوجد تاريخ للحالة
              </p>
              <p className="text-sm text-muted-foreground/70">
                سيظهر تاريخ تغييرات الحالة هنا عند توفرها
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
