import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users } from "lucide-react";

interface LeadProgressBarProps {
  currentLeads: number;
  targetLeads: number;
}

export const LeadProgressBar = ({
  currentLeads,
  targetLeads,
}: LeadProgressBarProps) => {
  const progressPercentage = Math.min((currentLeads / targetLeads) * 100, 100);
  const remainingLeads = Math.max(targetLeads - currentLeads, 0);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold flex items-center justify-between">
          Target Progress
          <Badge variant="secondary" className="text-sm font-normal">
            {currentLeads} / {targetLeads}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progressPercentage} className="h-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>{currentLeads} Customers Acquired</span>
            </div>
            <div className="flex items-center">
              <Target className="mr-2 h-4 w-4" />
              <span>{remainingLeads} Customers to Go</span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-primary">
              {progressPercentage.toFixed(1)}%
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              {progressPercentage >= 100
                ? "Target Achieved! 🎉"
                : `${remainingLeads} more Customers to reach your target`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
