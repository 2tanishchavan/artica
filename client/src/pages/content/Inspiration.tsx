import Recommended from "@/components/tabs/Recommended";
import Illustration from "@/components/tabs/Illustration";
import Painting from "@/components/tabs/Painting";
import Photography from "@/components/tabs/Photography";
import Sketch from "@/components/tabs/Sketch";
import ThreeDModelling from "@/components/tabs/ThreeDModelling";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS = [
  { name: "Recommended", value: "recommended", element: <Recommended /> },
  { name: "Photography", value: "photography", element: <Photography /> },
  { name: "Sketch", value: "sketch", element: <Sketch /> },
  { name: "Painting", value: "painting", element: <Painting /> },
  { name: "Illustration", value: "illustration", element: <Illustration /> },
  { name: "3D Modelling", value: "3d-modelling", element: <ThreeDModelling /> },
];

export default function Inspiration() {
  return (
    <div className="mx-10 py-6">
      <Tabs defaultValue="recommended">
        <TabsList className={`grid grid-cols-6 mb-5`}>
          {TABS.map((tab, index) => (
            <TabsTrigger key={index} value={tab.value}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((tab, index) => (
          <TabsContent key={index} value={tab.value}>
            {tab.element}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
