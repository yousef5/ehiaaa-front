import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, FileText, History, Sparkles, User } from "lucide-react";

interface StatusLog {
  id: string;
  status: string;
  description?: string;
  createdAt: string;
  observer?: {
    name: string;
  };
}

interface ObserverUserStatusHistoryProps {
  statusLogs?: StatusLog[];
}

export function ObserverUserStatusHistory({
  statusLogs,
}: ObserverUserStatusHistoryProps) {
  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (
      lowerStatus.includes("نشط") ||
      lowerStatus.includes("مكتمل") ||
      lowerStatus.includes("active") ||
      lowerStatus.includes("completed") ||
      lowerStatus.includes("approved")
    ) {
      return "bg-gradient-to-br from-emerald-500 to-green-600 dark:from-emerald-800 dark:to-green-800";
    } else if (
      lowerStatus.includes("معلق") ||
      lowerStatus.includes("انتظار") ||
      lowerStatus.includes("pending") ||
      lowerStatus.includes("waiting") ||
      lowerStatus.includes("review")
    ) {
      return "bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-800 dark:to-orange-800";
    } else if (
      lowerStatus.includes("ملغي") ||
      lowerStatus.includes("فشل") ||
      lowerStatus.includes("cancelled") ||
      lowerStatus.includes("failed") ||
      lowerStatus.includes("rejected")
    ) {
      return "bg-gradient-to-br from-rose-500 to-red-600 dark:from-rose-800 dark:to-red-800";
    } else if (
      lowerStatus.includes("غير نشط") ||
      lowerStatus.includes("inactive") ||
      lowerStatus.includes("deactivated")
    ) {
      return "bg-gradient-to-br from-slate-500 to-gray-600 dark:from-slate-800 dark:to-gray-800";
    }
    return "bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-800 dark:to-indigo-800";
  };

  const getStatusBgColor = (status: string, isLatest: boolean) => {
    const lowerStatus = status.toLowerCase();
    if (isLatest) {
      return "bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-purple-50/50 dark:from-gray-900/60 dark:via-gray-950/50 dark:to-gray-800/40 border-blue-200/60 dark:border-gray-700/60";
    } else if (
      lowerStatus.includes("نشط") ||
      lowerStatus.includes("مكتمل") ||
      lowerStatus.includes("active") ||
      lowerStatus.includes("completed") ||
      lowerStatus.includes("approved")
    ) {
      return "bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-lime-50/40 dark:from-gray-900/50 dark:via-gray-950/40 dark:to-gray-800/30 border-emerald-200/50 dark:border-gray-700/50";
    } else if (
      lowerStatus.includes("معلق") ||
      lowerStatus.includes("انتظار") ||
      lowerStatus.includes("pending") ||
      lowerStatus.includes("waiting") ||
      lowerStatus.includes("review")
    ) {
      return "bg-gradient-to-br from-amber-50/80 via-yellow-50/60 to-orange-50/40 dark:from-gray-900/50 dark:via-gray-950/40 dark:to-gray-800/30 border-amber-200/50 dark:border-gray-700/50";
    } else if (
      lowerStatus.includes("ملغي") ||
      lowerStatus.includes("فشل") ||
      lowerStatus.includes("cancelled") ||
      lowerStatus.includes("failed") ||
      lowerStatus.includes("rejected")
    ) {
      return "bg-gradient-to-br from-rose-50/80 via-red-50/60 to-pink-50/40 dark:from-gray-900/50 dark:via-gray-950/40 dark:to-gray-800/30 border-rose-200/50 dark:border-gray-700/50";
    } else if (
      lowerStatus.includes("غير نشط") ||
      lowerStatus.includes("inactive") ||
      lowerStatus.includes("deactivated")
    ) {
      return "bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-zinc-50/40 dark:from-gray-900/50 dark:via-gray-950/40 dark:to-gray-800/30 border-slate-200/50 dark:border-gray-700/50";
    }
    return "bg-gradient-to-br from-white/90 via-gray-50/70 to-slate-50/50 dark:from-gray-900/50 dark:via-gray-950/40 dark:to-gray-800/30 border-gray-200/50 dark:border-gray-700/50";
  };

  const getStatusBadgeColor = (status: string, isLatest: boolean) => {
    const lowerStatus = status.toLowerCase();
    if (isLatest) {
      return "bg-gradient-to-r from-blue-500/15 to-indigo-500/15 dark:from-gray-800/80 dark:to-gray-800/80 text-blue-700 dark:text-blue-400 border-blue-300/60 dark:border-gray-600/80";
    } else if (
      lowerStatus.includes("نشط") ||
      lowerStatus.includes("مكتمل") ||
      lowerStatus.includes("active") ||
      lowerStatus.includes("completed") ||
      lowerStatus.includes("approved")
    ) {
      return "bg-gradient-to-r from-emerald-50/80 to-green-50/80 dark:from-gray-800/70 dark:to-gray-800/70 text-emerald-700 dark:text-emerald-400 border-emerald-300/50 dark:border-gray-600/70";
    } else if (
      lowerStatus.includes("معلق") ||
      lowerStatus.includes("انتظار") ||
      lowerStatus.includes("pending") ||
      lowerStatus.includes("waiting") ||
      lowerStatus.includes("review")
    ) {
      return "bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:from-gray-800/70 dark:to-gray-800/70 text-amber-700 dark:text-amber-400 border-amber-300/50 dark:border-gray-600/70";
    } else if (
      lowerStatus.includes("ملغي") ||
      lowerStatus.includes("فشل") ||
      lowerStatus.includes("cancelled") ||
      lowerStatus.includes("failed") ||
      lowerStatus.includes("rejected")
    ) {
      return "bg-gradient-to-r from-rose-50/80 to-red-50/80 dark:from-gray-800/70 dark:to-gray-800/70 text-rose-700 dark:text-rose-400 border-rose-300/50 dark:border-gray-600/70";
    } else if (
      lowerStatus.includes("غير نشط") ||
      lowerStatus.includes("inactive") ||
      lowerStatus.includes("deactivated")
    ) {
      return "bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-gray-800/70 dark:to-gray-800/70 text-slate-700 dark:text-slate-400 border-slate-300/50 dark:border-gray-600/70";
    }
    return "bg-gradient-to-r from-gray-50/80 to-slate-50/80 dark:from-gray-800/70 dark:to-gray-800/70 text-gray-700 dark:text-gray-400 border-gray-300/50 dark:border-gray-600/70";
  };

  const getDescriptionBgColor = (status: string, isLatest: boolean) => {
    const lowerStatus = status.toLowerCase();
    if (isLatest) {
      return "bg-gradient-to-r from-indigo-50/70 to-blue-50/50 dark:from-gray-950/60 dark:to-gray-800/50 border-indigo-200/50 dark:border-gray-600/60";
    } else if (
      lowerStatus.includes("نشط") ||
      lowerStatus.includes("مكتمل") ||
      lowerStatus.includes("active") ||
      lowerStatus.includes("completed") ||
      lowerStatus.includes("approved")
    ) {
      return "bg-gradient-to-r from-emerald-50/70 to-green-50/50 dark:from-gray-950/60 dark:to-gray-800/50 border-emerald-200/50 dark:border-gray-600/60";
    } else if (
      lowerStatus.includes("معلق") ||
      lowerStatus.includes("انتظار") ||
      lowerStatus.includes("pending") ||
      lowerStatus.includes("waiting") ||
      lowerStatus.includes("review")
    ) {
      return "bg-gradient-to-r from-amber-50/70 to-orange-50/50 dark:from-gray-950/60 dark:to-gray-800/50 border-amber-200/50 dark:border-gray-600/60";
    } else if (
      lowerStatus.includes("ملغي") ||
      lowerStatus.includes("فشل") ||
      lowerStatus.includes("cancelled") ||
      lowerStatus.includes("failed") ||
      lowerStatus.includes("rejected")
    ) {
      return "bg-gradient-to-r from-rose-50/70 to-red-50/50 dark:from-gray-950/60 dark:to-gray-800/50 border-rose-200/50 dark:border-gray-600/60";
    } else if (
      lowerStatus.includes("غير نشط") ||
      lowerStatus.includes("inactive") ||
      lowerStatus.includes("deactivated")
    ) {
      return "bg-gradient-to-r from-slate-50/70 to-gray-50/50 dark:from-gray-950/60 dark:to-gray-800/50 border-slate-200/50 dark:border-gray-600/60";
    }
    return "bg-gradient-to-r from-gray-50/70 to-slate-50/50 dark:from-gray-950/60 dark:to-gray-800/50 border-gray-200/50 dark:border-gray-600/60";
  };

  const getIconBgColor = (isLatest: boolean) => {
    if (isLatest) {
      return "bg-blue-100/70 dark:bg-gray-900/80";
    }
    return "bg-gray-100/70 dark:bg-gray-900/70";
  };

  const getStatusIcon = (status: string, isLatest: boolean) => {
    const lowerStatus = status.toLowerCase();
    if (isLatest) {
      return "✨";
    } else if (
      lowerStatus.includes("نشط") ||
      lowerStatus.includes("مكتمل") ||
      lowerStatus.includes("active") ||
      lowerStatus.includes("completed") ||
      lowerStatus.includes("approved")
    ) {
      return "✅";
    } else if (
      lowerStatus.includes("معلق") ||
      lowerStatus.includes("انتظار") ||
      lowerStatus.includes("pending") ||
      lowerStatus.includes("waiting") ||
      lowerStatus.includes("review")
    ) {
      return "⏳";
    } else if (
      lowerStatus.includes("ملغي") ||
      lowerStatus.includes("فشل") ||
      lowerStatus.includes("cancelled") ||
      lowerStatus.includes("failed") ||
      lowerStatus.includes("rejected")
    ) {
      return "❌";
    } else if (
      lowerStatus.includes("غير نشط") ||
      lowerStatus.includes("inactive") ||
      lowerStatus.includes("deactivated")
    ) {
      return "⏸️";
    }
    return "🔄";
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
    <Card className="w-full shadow-lg border-0 bg-gradient-to-br from-white via-slate-50/60 to-gray-50/40 dark:from-gray-900 dark:via-gray-950/90 dark:to-black/80 backdrop-blur-xl overflow-hidden">
      {/* Enhanced Header */}
      <CardHeader className="relative overflow-hidden bg-gradient-to-r from-slate-50/80 to-gray-50/60 dark:from-gray-900/90 dark:to-gray-950/80 border-b border-gray-200/60 dark:border-gray-800/60">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100/20 via-gray-100/15 to-zinc-100/10 dark:from-gray-900/30 dark:via-gray-950/20 dark:to-black/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-200/10 to-gray-300/15 dark:from-gray-800/15 dark:to-gray-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-200/10 to-slate-300/15 dark:from-gray-800/15 dark:to-gray-900/20 rounded-full blur-2xl"></div>

        <CardTitle className="relative flex items-center gap-4 text-foreground pb-2">
          <div className="relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-gray-700 dark:from-gray-800 dark:to-gray-900 shadow-lg">
              <History className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full flex items-center justify-center">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-slate-700 dark:from-gray-100 dark:to-white bg-clip-text text-transparent">
              سجل تاريخ الحالة
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
              تتبع شامل لجميع التغييرات والأنشطة
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-4">
        {statusLogs && statusLogs.length > 0 ? (
          <ScrollArea className="h-[420px] w-full pr-4">
            <div className="space-y-1">
              {[...statusLogs].reverse().map((log, index) => {
                const reversedIndex = statusLogs.length - 1 - index;
                const isLatest = index === 0;

                return (
                  <div key={log.id} className="relative group">
                    {/* Timeline line */}
                    {reversedIndex > 0 && (
                      <div className="absolute right-[15px] top-12 w-0.5 h-20 bg-gradient-to-b from-gray-300/80 via-gray-200/60 to-transparent dark:from-gray-900/80 dark:via-gray-800/60 dark:to-transparent" />
                    )}

                    <div className="flex items-start gap-5 pb-8 relative">
                      {/* Status indicator */}
                      <div className="flex-shrink-0 relative z-10">
                        {/* Pulsing animation for latest status */}
                        {isLatest && (
                          <div className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-400/25 to-indigo-500/25 dark:from-blue-800/30 dark:to-indigo-800/30 animate-ping" />
                        )}
                        {/* Outer glow ring */}
                        <div
                          className={`absolute inset-0 w-8 h-8 rounded-full ${getStatusColor(
                            log.status
                          )} opacity-15 blur-sm`}
                        />

                        {/* Main status circle */}
                        <div
                          className={`relative w-8 h-8 rounded-full ${getStatusColor(
                            log.status
                          )} shadow-lg border-2 border-white dark:border-gray-900 flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                        >
                          {/* Inner glow */}
                          <div className="absolute inset-1 rounded-full bg-white/25 dark:bg-black/20" />

                          {/* Status emoji */}
                          <span className="relative text-xs z-10">
                            {getStatusIcon(log.status, isLatest)}
                          </span>
                        </div>
                      </div>

                      {/* Content card */}
                      <div className="flex-1 min-w-0">
                        <div
                          className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 ${getStatusBgColor(
                            log.status,
                            isLatest
                          )}`}
                        >
                          {/* Content header */}
                          <div className="p-4 pb-3">
                            <div className="flex items-center justify-between mb-3">
                              {/* Status badge */}
                              <div
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${getStatusBadgeColor(
                                  log.status,
                                  isLatest
                                )}`}
                              >
                                <span className="text-base">
                                  {getStatusIcon(log.status, isLatest)}
                                </span>
                                <span>{log.status}</span>
                                {isLatest && (
                                  <span className="text-xs bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                                    أحدث
                                  </span>
                                )}
                              </div>

                              {/* Timestamp */}
                              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <div
                                  className={`p-1.5 rounded-lg ${getIconBgColor(
                                    isLatest
                                  )}`}
                                >
                                  <Clock className="h-3.5 w-3.5" />
                                </div>
                                <span className="font-medium">
                                  {formatDate(log.createdAt)}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            {log.description && (
                              <div
                                className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 ${getDescriptionBgColor(
                                  log.status,
                                  isLatest
                                )}`}
                              >
                                <div
                                  className={`p-2 rounded-lg flex-shrink-0 ${
                                    isLatest
                                      ? "bg-indigo-100/80 dark:bg-gray-800/80"
                                      : "bg-gray-100/80 dark:bg-gray-800/70"
                                  }`}
                                >
                                  <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                  {log.description}
                                </p>
                              </div>
                            )}

                            {/* Observer info */}
                            {log.observer && (
                              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200/60 dark:border-gray-700/60">
                                <div
                                  className={`p-1.5 rounded-lg ${
                                    isLatest
                                      ? "bg-slate-100/80 dark:bg-gray-800/80"
                                      : "bg-gray-100/80 dark:bg-gray-800/70"
                                  }`}
                                >
                                  <User className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                  تم بواسطة {log.observer.name}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            {/* Empty state */}
            <div className="relative">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gray-100/80 to-slate-200/60 dark:from-gray-800/80 dark:to-gray-900/60 shadow-lg border border-gray-200/50 dark:border-gray-700/60">
                <History className="h-10 w-10 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-900">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>

            <div className="text-center space-y-3 max-w-md">
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                لا يوجد سجل لتاريخ الحالة
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                سيظهر هنا تاريخ شامل لجميع تغييرات حالة المستخدم والأنشطة
                المرتبطة بحسابه عند توفرها
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-50/80 to-gray-50/60 dark:from-gray-900/80 dark:to-gray-800/70 text-slate-600 dark:text-gray-400 text-sm font-medium border border-slate-200/60 dark:border-gray-700/70">
                <Clock className="h-4 w-4" />
                <span>في انتظار النشاط الأول</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
