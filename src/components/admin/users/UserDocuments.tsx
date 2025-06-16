import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, FileText } from "lucide-react";

interface Document {
  filename: string;
  url: string;
  uploadedAt: string;
}

interface UserDocumentsProps {
  documents: {
    identityPapers?: Document[];
  };
}

export function UserDocuments({ documents }: UserDocumentsProps) {
  const downloadDocument = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    }${url}`;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          الوثائق المرفقة
        </CardTitle>
      </CardHeader>
      <CardContent>
        {documents.identityPapers && documents.identityPapers.length > 0 ? (
          <div className="space-y-3">
            {documents.identityPapers.map((doc, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between p-3 border rounded-lg"
              >
                <p className="font-medium">{doc.filename}</p>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      تم الرفع:
                      {new Date(doc.uploadedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open(
                        `${
                          process.env.NEXT_PUBLIC_API_URL ||
                          "http://localhost:3000"
                        }/public/${doc.url}`,
                        "_blank"
                      )
                    }
                  >
                    <Eye className="h-4 w-4 ml-2" />
                    عرض
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      downloadDocument(`/public/${doc.url}`, doc.filename)
                    }
                  >
                    <Download className="h-4 w-4 ml-2" />
                    تحميل
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-4">
            لا توجد وثائق مرفقة
          </p>
        )}
      </CardContent>
    </Card>
  );
}
