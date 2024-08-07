import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cat, Heart, Info } from "lucide-react";

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr, meow, and hiss.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
];

const Index = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const nextFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold mb-6 text-center text-purple-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          All About Cats <Cat className="inline-block ml-2" />
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" 
            alt="Cute cat" 
            className="mx-auto object-cover w-full h-[400px] rounded-lg mb-8 shadow-lg"
          />
        </motion.div>

        <Tabs defaultValue="characteristics" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle>Characteristics of Cats</CardTitle>
                <CardDescription>What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><Badge variant="outline"><Info className="mr-1 h-3 w-3" /> Independent nature</Badge></li>
                  <li><Badge variant="outline"><Info className="mr-1 h-3 w-3" /> Excellent hunters with sharp claws and teeth</Badge></li>
                  <li><Badge variant="outline"><Info className="mr-1 h-3 w-3" /> Flexible bodies and quick reflexes</Badge></li>
                  <li><Badge variant="outline"><Info className="mr-1 h-3 w-3" /> Keen senses, especially hearing and night vision</Badge></li>
                  <li><Badge variant="outline"><Info className="mr-1 h-3 w-3" /> Communicate through vocalizations, body language, and scent</Badge></li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle>Popular Cat Breeds</CardTitle>
                <CardDescription>Some well-known cat breeds around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-2">
                  <li><Badge><Heart className="mr-1 h-3 w-3" /> Siamese</Badge></li>
                  <li><Badge><Heart className="mr-1 h-3 w-3" /> Persian</Badge></li>
                  <li><Badge><Heart className="mr-1 h-3 w-3" /> Maine Coon</Badge></li>
                  <li><Badge><Heart className="mr-1 h-3 w-3" /> Bengal</Badge></li>
                  <li><Badge><Heart className="mr-1 h-3 w-3" /> Scottish Fold</Badge></li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Fun Cat Facts</CardTitle>
            <CardDescription>Click the button to learn more about cats!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{catFacts[currentFactIndex]}</p>
            <Button onClick={nextFact}>Next Fact</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
