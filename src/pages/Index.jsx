import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cat, Heart, Info, Paw, Fish, Moon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

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
  const [progress, setProgress] = useState(0);

  const nextFact = () => {
    setShowFact(false);
    setTimeout(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
      setShowFact(true);
      setProgress(0);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          nextFact();
          return 0;
        }
        return prevProgress + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-purple-800 inline-flex items-center">
            Feline Fascination 
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Cat className="ml-2 h-12 w-12" />
            </motion.span>
          </h1>
          <p className="text-xl mt-2 text-purple-600">Explore the Wonderful World of Cats</p>
        </motion.div>
        
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle>Characteristics of Cats</CardTitle>
                <CardDescription>What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Paw, text: "Independent nature" },
                    { icon: Fish, text: "Excellent hunters" },
                    { icon: Moon, text: "Nocturnal tendencies" },
                    { icon: Info, text: "Flexible bodies" },
                    { icon: Info, text: "Quick reflexes" },
                    { icon: Info, text: "Keen senses" },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge variant="outline" className="p-2 text-sm w-full">
                        <item.icon className="mr-2 h-4 w-4" /> {item.text}
                      </Badge>
                    </motion.li>
                  ))}
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
                  {["Siamese", "Persian", "Maine Coon", "Bengal", "Scottish Fold", "Sphynx"].map((breed, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge className="p-2 w-full">
                        <Heart className="mr-2 h-4 w-4" /> {breed}
                      </Badge>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="behavior">
            <Card>
              <CardHeader>
                <CardTitle>Cat Behavior</CardTitle>
                <CardDescription>Understanding feline body language</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Purring: Often a sign of contentment",
                    "Tail position: Indicates mood",
                    "Kneading: A comforting behavior",
                    "Ear position: Shows alertness or aggression",
                    "Slow blinking: A sign of trust and affection",
                  ].map((behavior, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <Cat className="mr-2 h-4 w-4 text-purple-600" />
                      {behavior}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Fascinating Feline Facts</CardTitle>
            <CardDescription>Discover interesting tidbits about our feline friends!</CardDescription>
          </CardHeader>
          <CardContent className="text-center relative">
            <AnimatePresence mode="wait">
              {showFact && (
                <motion.div
                  key={currentFactIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <p className="text-xl font-medium text-purple-700">{catFacts[currentFactIndex]}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <Progress value={progress} className="w-full mb-4" />
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
