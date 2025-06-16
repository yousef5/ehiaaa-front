import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RegistrationHeaderProps {
  title: string;
  description: string;
}

export function RegistrationHeader({
  title,
  description,
}: RegistrationHeaderProps) {
  return (
    <CardHeader className="text-center pb-6">
      <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </CardTitle>
      <CardDescription className="text-gray-600 dark:text-gray-400">
        {description}
      </CardDescription>
    </CardHeader>
  );
}
