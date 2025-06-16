import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  CheckCircle,
  Clock,
  Droplets,
  UserCheck,
  Users,
  UserX,
  XCircle,
} from "lucide-react";

interface UsersSummary {
  users: {
    total: number;
    active: number;
    inactive: number;
    needApproval: number;
  };
  hospitals: {
    total: number;
    active: number;
    inactive: number;
    needApproval: number;
  };
  bloodBanks: {
    total: number;
    active: number;
    inactive: number;
    needApproval: number;
  };
  total: number;
  active: number;
  inactive: number;
  pending: number;
}

interface UsersStatsCardsProps {
  summary: UsersSummary;
}

export function UsersStatsCards({ summary }: UsersStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Users Stats */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المتبرعين</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {summary.users.total}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
            <span className="flex items-center">
              <UserCheck className="h-3 w-3 text-green-600 ml-1" />
              مفعل: {summary.users.active}
            </span>
            <span className="flex items-center">
              <UserX className="h-3 w-3 text-red-600 ml-1" />
              غير مفعل: {summary.users.inactive}
            </span>
          </div>
          <div className="text-xs text-yellow-600 mt-1">
            <Clock className="h-3 w-3 inline ml-1" />
            ينتظر الموافقة: {summary.users.needApproval}
          </div>
        </CardContent>
      </Card>

      {/* Hospitals Stats */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المستشفيات</CardTitle>
          <Building2 className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {summary.hospitals.total}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
            <span className="flex items-center">
              <UserCheck className="h-3 w-3 text-green-600 ml-1" />
              مفعل: {summary.hospitals.active}
            </span>
            <span className="flex items-center">
              <UserX className="h-3 w-3 text-red-600 ml-1" />
              غير مفعل: {summary.hospitals.inactive}
            </span>
          </div>
          <div className="text-xs text-yellow-600 mt-1">
            <Clock className="h-3 w-3 inline ml-1" />
            ينتظر الموافقة: {summary.hospitals.needApproval}
          </div>
        </CardContent>
      </Card>

      {/* Blood Banks Stats */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">بنوك الدم</CardTitle>
          <Droplets className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {summary.bloodBanks.total}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
            <span className="flex items-center">
              <UserCheck className="h-3 w-3 text-green-600 ml-1" />
              مفعل: {summary.bloodBanks.active}
            </span>
            <span className="flex items-center">
              <UserX className="h-3 w-3 text-red-600 ml-1" />
              غير مفعل: {summary.bloodBanks.inactive}
            </span>
          </div>
          <div className="text-xs text-yellow-600 mt-1">
            <Clock className="h-3 w-3 inline ml-1" />
            ينتظر الموافقة: {summary.bloodBanks.needApproval}
          </div>
        </CardContent>
      </Card>

      {/* Total Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المجموع الكلي</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {summary.total}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
            <span className="flex items-center">
              <CheckCircle className="h-3 w-3 text-green-600 ml-1" />
              مفعل: {summary.active}
            </span>
            <span className="flex items-center">
              <XCircle className="h-3 w-3 text-red-600 ml-1" />
              غير مفعل: {summary.inactive}
            </span>
          </div>
          <div className="text-xs text-yellow-600 mt-1">
            <Clock className="h-3 w-3 inline ml-1" />
            ينتظر الموافقة: {summary.pending}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
