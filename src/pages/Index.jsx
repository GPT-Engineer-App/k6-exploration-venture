import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cat, Heart, Info, Paw, Fish, Moon, Star, ChevronDown } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [likedFacts, setLikedFacts] = useState([]);
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const contentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const nextFact = () => {
    setShowFact(false);
    setTimeout(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
      setShowFact(true);
      setProgress(0);
    }, 300);
  };

  const toggleLikeFact = (index) => {
    setLikedFacts((prev) => {
      const newLikedFacts = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];
      
      toast({
        title: prev.includes(index) ? "Fact unliked" : "Fact liked",
        description: catFacts[index].slice(0, 50) + "...",
      });

      return newLikedFacts;
    });
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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-80 backdrop-blur-md shadow-md transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
      >
        <div className="max-w-5xl mx-auto py-4 px-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-800 flex items-center">
            <Cat className="mr-2 h-6 w-6 text-pink-500" />
            Feline Fascination
          </h2>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#gallery" className="text-purple-600 hover:text-purple-800">Gallery</a></li>
              <li><a href="#facts" className="text-purple-600 hover:text-purple-800">Facts</a></li>
              <li><a href="#breeds" className="text-purple-600 hover:text-purple-800">Breeds</a></li>
            </ul>
          </nav>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-8 pt-24">
        <motion.div 
          className="text-center mb-12 h-screen flex flex-col justify-center items-center"
          style={{ opacity, scale }}
          ref={contentRef}
        >
          <motion.h1 
            className="text-8xl font-bold text-purple-800 inline-flex items-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Feline Fascination 
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Cat className="ml-4 h-24 w-24 text-pink-500" />
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-3xl mt-4 text-purple-600 font-light max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Embark on a Whimsical Journey Through the Enchanting World of Cats
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-xl px-8 py-4"
              onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
            >
              Start Exploring
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          id="gallery"
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-purple-800 mb-8 text-center">Feline Gallery</h2>
          <Carousel className="mb-12">
            <CarouselContent>
              {catImages.map((src, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={src}
                      alt={`Cat ${index + 1}`}
                      className="mx-auto object-cover w-full h-[600px] rounded-xl shadow-2xl"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="characteristics" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="characteristics" className="text-lg">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds" className="text-lg">Popular Breeds</TabsTrigger>
              <TabsTrigger value="behavior" className="text-lg">Behavior</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <Card className="border-2 border-purple-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-700">Characteristics of Cats</CardTitle>
                  <CardDescription className="text-lg">What makes cats truly unique?</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-6">
                    {[
                      { icon: Paw, text: "Independent nature", description: "Cats are known for their self-reliance" },
                      { icon: Fish, text: "Excellent hunters", description: "Natural predators with keen instincts" },
                      { icon: Moon, text: "Nocturnal tendencies", description: "Most active during twilight hours" },
                      { icon: Info, text: "Flexible bodies", description: "Can squeeze through small spaces" },
                      { icon: Info, text: "Quick reflexes", description: "Lightning-fast responses to stimuli" },
                      { icon: Info, text: "Keen senses", description: "Exceptional hearing and night vision" },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="p-3 text-base w-full hover:bg-purple-100 transition-colors cursor-help">
                                <item.icon className="mr-2 h-5 w-5 text-purple-600" /> {item.text}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{item.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card className="border-2 border-purple-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-700">Popular Cat Breeds</CardTitle>
                  <CardDescription className="text-lg">Discover well-known cat breeds from around the world</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-3 gap-6">
                    {[
                      { name: "Siamese", origin: "Thailand", trait: "Vocal and social" },
                      { name: "Persian", origin: "Iran", trait: "Long-haired and calm" },
                      { name: "Maine Coon", origin: "United States", trait: "Large and friendly" },
                      { name: "Bengal", origin: "United States", trait: "Spotted coat and active" },
                      { name: "Scottish Fold", origin: "Scotland", trait: "Folded ears and sweet" },
                      { name: "Sphynx", origin: "Canada", trait: "Hairless and affectionate" },
                    ].map((breed, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge className="p-3 text-base w-full hover:bg-pink-100 transition-colors cursor-help">
                                <Heart className="mr-2 h-5 w-5 text-pink-500" /> {breed.name}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p><strong>Origin:</strong> {breed.origin}</p>
                              <p><strong>Trait:</strong> {breed.trait}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="behavior">
              <Card className="border-2 border-purple-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-700">Cat Behavior</CardTitle>
                  <CardDescription className="text-lg">Decoding feline body language and communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      { behavior: "Purring", description: "Often a sign of contentment, but can also indicate stress or pain" },
                      { behavior: "Tail position", description: "Upright tail means friendly, puffed tail means scared or angry" },
                      { behavior: "Kneading", description: "A comforting behavior reminiscent of kittenhood" },
                      { behavior: "Ear position", description: "Forward ears show interest, flattened ears indicate fear or aggression" },
                      { behavior: "Slow blinking", description: "A sign of trust and affection, often called a 'cat kiss'" },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start p-3 bg-blue-50 rounded-lg"
                      >
                        <Cat className="mr-3 h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-lg text-blue-700">{item.behavior}:</strong>
                          <p className="text-blue-600">{item.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          id="facts"
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-purple-800 mb-8 text-center">Fascinating Feline Facts</h2>
          <Card className="overflow-hidden border-2 border-purple-300">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-700">Did You Know?</CardTitle>
              <CardDescription className="text-lg">Uncover intriguing tidbits about our purr-fect companions!</CardDescription>
            </CardHeader>
            <CardContent className="text-center relative p-6">
              <AnimatePresence mode="wait">
                {showFact && (
                  <motion.div
                    key={currentFactIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                  >
                    <p className="text-3xl font-medium text-purple-700">{catFacts[currentFactIndex]}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <Progress value={progress} className="w-full mb-6 h-2" />
              <div className="flex justify-center space-x-4">
                <Button onClick={nextFact} className="bg-purple-600 hover:bg-purple-700 text-lg px-6 py-3">
                  Next Fact
                </Button>
                <Button 
                  onClick={() => toggleLikeFact(currentFactIndex)} 
                  variant="outline"
                  className={`text-lg px-6 py-3 ${likedFacts.includes(currentFactIndex) ? 'bg-pink-100 text-pink-700' : ''}`}
                >
                  <Star className={`mr-2 h-5 w-5 ${likedFacts.includes(currentFactIndex) ? 'fill-pink-500' : ''}`} />
                  {likedFacts.includes(currentFactIndex) ? 'Liked!' : 'Like'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          id="breeds"
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-purple-800 mb-8 text-center">Popular Cat Breeds</h2>
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Siamese", origin: "Thailand", trait: "Vocal and social", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
                { name: "Persian", origin: "Iran", trait: "Long-haired and calm", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
                { name: "Maine Coon", origin: "United States", trait: "Large and friendly", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
                { name: "Bengal", origin: "United States", trait: "Spotted coat and active", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
                { name: "Scottish Fold", origin: "Scotland", trait: "Folded ears and sweet", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
                { name: "Sphynx", origin: "Canada", trait: "Hairless and affectionate", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
              ].map((breed, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-purple-700">{breed.name}</h3>
                    <p className="text-gray-600"><strong>Origin:</strong> {breed.origin}</p>
                    <p className="text-gray-600"><strong>Trait:</strong> {breed.trait}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
