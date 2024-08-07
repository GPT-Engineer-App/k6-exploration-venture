import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cat, Heart, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr, meow, and hiss.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
  "A cat's hearing is much more sensitive than a human's or dog's.",
  "Cats have a third eyelid called the 'haw' to protect their eyes.",
  "A cat's sense of smell is 14 times stronger than a human's.",
];

const catImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1200px-Sleeping_cat_on_her_back.jpg",
];

const Index = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showFact, setShowFact] = useState(true);

  const nextFact = () => {
    setShowFact(false);
    setTimeout(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
      setShowFact(true);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(nextFact, 10000); // Change fact every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold mb-8 text-center text-purple-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Feline Fascination <Cat className="inline-block ml-2" />
        </motion.h1>
        
        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={src}
                    alt={`Cat ${index + 1}`}
                    className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

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
                <ul className="grid grid-cols-2 gap-4">
                  <li><Badge variant="outline" className="p-2 text-sm"><Info className="mr-2 h-4 w-4" /> Independent nature</Badge></li>
                  <li><Badge variant="outline" className="p-2 text-sm"><Info className="mr-2 h-4 w-4" /> Excellent hunters</Badge></li>
                  <li><Badge variant="outline" className="p-2 text-sm"><Info className="mr-2 h-4 w-4" /> Flexible bodies</Badge></li>
                  <li><Badge variant="outline" className="p-2 text-sm"><Info className="mr-2 h-4 w-4" /> Quick reflexes</Badge></li>
                  <li><Badge variant="outline" className="p-2 text-sm"><Info className="mr-2 h-4 w-4" /> Keen senses</Badge></li>
                  <li><Badge variant="outline" className="p-2 text-sm"><Info className="mr-2 h-4 w-4" /> Complex communication</Badge></li>
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
                <ul className="grid grid-cols-3 gap-4">
                  <li><Badge className="p-2"><Heart className="mr-2 h-4 w-4" /> Siamese</Badge></li>
                  <li><Badge className="p-2"><Heart className="mr-2 h-4 w-4" /> Persian</Badge></li>
                  <li><Badge className="p-2"><Heart className="mr-2 h-4 w-4" /> Maine Coon</Badge></li>
                  <li><Badge className="p-2"><Heart className="mr-2 h-4 w-4" /> Bengal</Badge></li>
                  <li><Badge className="p-2"><Heart className="mr-2 h-4 w-4" /> Scottish Fold</Badge></li>
                  <li><Badge className="p-2"><Heart className="mr-2 h-4 w-4" /> Sphynx</Badge></li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Fascinating Feline Facts</CardTitle>
            <CardDescription>Discover interesting tidbits about our feline friends!</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <AnimatePresence mode="wait">
              {showFact && (
                <motion.p
                  key={currentFactIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl mb-6 font-medium text-purple-700"
                >
                  {catFacts[currentFactIndex]}
                </motion.p>
              )}
            </AnimatePresence>
            <Button onClick={nextFact} className="bg-purple-600 hover:bg-purple-700">
              Next Fact
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
