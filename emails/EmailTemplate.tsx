import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const PREVIEW_DATA = {
  monthlyReport: {
    userName: "John Doe",
    type: "monthly-report",
    data: {
      month: "December",
      stats: {
        totalIncome: 5000,
        totalExpenses: 3500,
        byCategory: {
          housing: 1500,
          groceries: 600,
          transportation: 400,
          entertainment: 300,
          utilities: 700,
        },
      },
      insights: [
        "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
        "Great job keeping entertainment expenses under control this month!",
        "Setting up automatic savings could help you save 20% more of your income.",
      ],
    },
  },
  budgetAlert: {
    userName: "John Doe",
    type: "budget-alert",
    data: {
      percentageUsed: 85,
      budgetAmount: 4000,
      totalExpenses: 3400,
    },
  },
};

type BudgetReportData = {
  percentageUsed: number;
  budgetAmount: number;
  totalExpenses: number;
};

export type MonthlyReportData = {
  month: string;
  stats: {
    totalIncome: number;
    totalExpenses: number;
    byCategory: Record<string, number>;
  };
  insights: string[];
};

interface EmailTemplateProps {
  userName: string | null;
  type: "monthly-report" | "budget-alert";
  data: MonthlyReportData | BudgetReportData;
}

const EmailTemplate = ({
  userName,
  type = "monthly-report",
  data = PREVIEW_DATA.monthlyReport.data,
}: EmailTemplateProps) => {
  if (type === "monthly-report" && "stats" in data) {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>

        <Tailwind>
          <Body className="bg-gray-100 font-sans">
            <Container className="bg-white p-6">
              <Heading className="text-center text-2xl font-bold text-gray-800">
                Monthly Financial Report
              </Heading>

              <Text className="text-gray-600 mt-4">Hello {userName},</Text>

              <Text className="text-gray-600 mt-2">
                Here&rsquo;s your financial summary for {data?.month}:
              </Text>

              {/* Stats */}
              <Section className="mt-6 bg-gray-50 p-4">
                <Section className="bg-white p-4 mb-4">
                  <Text className="text-sm text-gray-500">Total Income</Text>
                  <Text className="text-lg font-semibold text-gray-800">
                    &#8377;{data?.stats?.totalIncome.toFixed(2)}
                  </Text>
                </Section>

                <Section className="bg-white p-4 mb-4">
                  <Text className="text-sm text-gray-500">Total Expenses</Text>
                  <Text className="text-lg font-semibold text-gray-800">
                    &#8377;{data?.stats?.totalExpenses.toFixed(2)}
                  </Text>
                </Section>

                <Section className="bg-white p-4">
                  <Text className="text-sm text-gray-500">Net</Text>
                  <Text className="text-lg font-semibold text-gray-800">
                    &#8377;
                    {data?.stats?.totalIncome - data?.stats?.totalExpenses}
                  </Text>
                </Section>
              </Section>

              {/* Category Breakdown */}
              {data?.stats?.byCategory && (
                <Section className="mt-6 bg-gray-50 p-4">
                  <Heading className="text-lg font-semibold text-gray-800 mb-4">
                    Expenses by Category
                  </Heading>

                  {Object.entries(data.stats.byCategory).map(
                    ([category, amount]) => (
                      <Row key={category} className="mb-2">
                        <Column>
                          <Text className="capitalize text-gray-600">
                            {category}
                          </Text>
                        </Column>
                        <Column align="right">
                          <Text className="text-gray-600">
                            &#8377;{amount.toFixed(2)}
                          </Text>
                        </Column>
                      </Row>
                    )
                  )}
                </Section>
              )}

              {/* Insights */}
              {data?.insights && (
                <Section className="mt-6 bg-gray-50 p-4">
                  <Heading className="text-lg font-semibold text-gray-800 mb-4">
                    Welth Insights
                  </Heading>

                  {data.insights.map((insight) => (
                    <Text key={insight} className="text-gray-600 mb-2">
                      • {insight}
                    </Text>
                  ))}
                </Section>
              )}

              <Text className="mt-6 pt-4 text-center text-sm text-gray-500">
                Thank you for using Welth. Keep tracking your finances for
                better financial health!
              </Text>

              <Img
                src="http://localhost:3000/logo.png"
                alt="Welth Logo"
                width="100"
                className="mx-auto mt-4"
              />
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  }

  if (type === "budget-alert" && "percentageUsed" in data) {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>

        <Tailwind>
          <Body className="bg-gray-100 font-sans">
            <Container className="bg-white p-6">
              <Heading className="text-center text-2xl font-bold text-gray-800">
                Budget Alert
              </Heading>

              <Text className="text-gray-600 mt-4">Hello {userName},</Text>

              <Text className="text-gray-600 mt-2">
                You&apos;ve used {data?.percentageUsed?.toFixed(1)}% of your
                monthly budget.
              </Text>

              <Section className="mt-6 bg-gray-50 p-4">
                <Section className="bg-white p-4 mb-4">
                  <Text className="text-gray-500 text-sm">Budget Amount</Text>
                  <Text className="text-lg font-semibold text-gray-800">
                    &#8377;{data?.budgetAmount}
                  </Text>
                </Section>

                <Section className="bg-white p-4 mb-4">
                  <Text className="text-gray-500 text-sm">Spent So Far</Text>
                  <Text className="text-lg font-semibold text-gray-800">
                    &#8377;{data?.totalExpenses}
                  </Text>
                </Section>

                <Section className="bg-white p-4">
                  <Text className="text-gray-500 text-sm">Remaining</Text>
                  <Text className="text-lg font-semibold text-gray-800">
                    &#8377;{data?.budgetAmount - data?.totalExpenses}
                  </Text>
                </Section>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  }
};

export default EmailTemplate;
