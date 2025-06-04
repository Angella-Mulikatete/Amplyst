'use client'

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Calendar, 
  Settings,
  User,
  ArrowUp,
  CheckIcon,
  Star,
  TrendingUp,
  Zap,
  Shield,
  MessageSquare,
  BarChart3,
  Target,
  Globe,
  Heart,
  Award
} from "lucide-react";

export default function Home() {
  // const features = [
  //   {
  //     icon: <Users className="h-8 w-8 text-primary" />,
  //     title: "Connect Seamlessly",
  //     description: "Find the perfect influencers or brands for your campaigns with our advanced discovery tools.",
  //   },
  //   {
  //     icon: <Target className="h-8 w-8 text-primary" />,
  //     title: "Manage Campaigns Efficiently",
  //     description: "Streamline your campaign workflow from creation to completion with intuitive management features.",
  //   },
  //   {
  //     icon: <Wand2 className="h-8 w-8 text-primary" />,
  //     title: "AI-Powered Matching",
  //     description: "Leverage artificial intelligence to get smart recommendations for influencer collaborations.",
  //   },
  //   {
  //     icon: <CheckCircle className="h-8 w-8 text-primary" />,
  //     title: "Data-Driven Insights",
  //     description: "Track performance with real-time analytics and make informed decisions to optimize your strategy.",
  //   },
  // ];

  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "AI-Powered Matching",
      description: "Our advanced AI finds the perfect influencer-brand matches based on audience demographics, engagement rates, and campaign goals."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Track campaign performance with comprehensive analytics including impressions, engagement, ROI, and conversion metrics."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Seamless Communication",
      description: "Built-in messaging system with file sharing, campaign briefs, and real-time notifications for smooth collaboration."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Protected payment processing with automated contract management and milestone-based payment releases."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Beauty Influencer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1ab?w=150&h=150&fit=crop&crop=face",
      content: "Amplyst revolutionized how I work with brands. The AI matching is incredible - I only get campaigns that truly align with my audience.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Brand Manager at TechCorp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "We've seen a 300% increase in campaign ROI since switching to Amplyst. The analytics dashboard is game-changing.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Agency Director",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Managing multiple influencer campaigns has never been easier. Amplyst streamlined our entire workflow.",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Influencers" },
    { number: "1000+", label: "Brand Partners" },
    { number: "$10M+", label: "Campaigns Processed" },
    { number: "98%", label: "Success Rate" }
  ];


  return (
    <div className="root">
      <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-bold bg-[linear-gradient(135deg,_#3A7CA5_0%,_#2E6384_100%)] bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Amplyst
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-[rgb(58_124_165)] transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-[rgb(58_124_165)] transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-[rgb(58_124_165)] transition-colors">Testimonials</a>
              <Button variant="outline" className="border-[rgb(58_124_165)] text-[rgb(58_124_165)] hover:bg-[rgb(58_124_165)] hover:text-white">
                Sign In
              </Button>
              <Button className="bg-[linear-gradient(135deg,_#3A7CA5_0%,_#2E6384_100%)] text-white hover:shadow-lg transition-all duration-300">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(135deg,_#3A7CA5_0%,_#88B04B_50%,_#E19629_100%)] opacity-10"
          style={{ y: backgroundY }}
        />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
           <Badge className="mb-6 bg-[rgb(209_229_239/_1)] text-[rgb(35_74_99/1)] hover:bg-[rgb(163_203_223)] transition-colors duration-300">
            🚀 The Future of Influencer Marketing
          </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Connect. Create.{" "}
              <span className="bg-[linear-gradient(135deg,_#3A7CA5_0%,_#2E6384_100%)] bg-clip-text text-transparent">
                Amplify.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              The world's most advanced influencer marketing platform. 
              AI-powered matching, real-time analytics, and seamless collaboration 
              for brands, influencers, and agencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-[linear-gradient(135deg,_#3A7CA5_0%,_#2E6384_100%)] text-white px-8 py-4 text-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
                >
                  Start Your Journey
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-[rgb(58_124_165)] text-[rgb(58_124_165)] px-8 py-4 text-lg hover:bg-[rgb(58_124_165)] hover:text-white transition-all duration-300"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-secondary rounded-full opacity-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-accent rounded-full opacity-20"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for{" "}
              <span className="bg-[linear-gradient(135deg,_#3A7CA5_0%,_#2E6384_100%)] bg-clip-text text-transparent">
                Every User
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're an influencer, brand, or agency, Amplyst provides 
              the tools you need to succeed in the modern marketing landscape.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-[linear-gradient(135deg,_#3A7CA5_0%,_#2E6384_100%)] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based Value Props */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for{" "}
              <span className="bg-[linear-gradient(135deg,_#88B04B_0%,_#6D8D3C_100%)]  bg-clip-text text-transparent">
                Every Role
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Influencers */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-[linear-gradient(135deg,_#3A7CA5_0%,_#2E6384_100%)] rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <User className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">For Influencers</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Get discovered by premium brands, manage campaigns effortlessly, 
                and grow your income with our intelligent matching system.
              </p>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "AI-powered brand matching",
                  "Automated contract management",
                  "Real-time performance analytics",
                  "Secure payment processing"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckIcon className="w-5 h-5 text-[rgb(58_124_165)] mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Button className="bg-[linear-gradient(135deg,_#3A7CA5_0%,_#2E6384_100%)] text-white hover:shadow-lg transition-all duration-300">
                Join as Influencer
              </Button>
            </motion.div>

            {/* Brands */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-[linear-gradient(135deg,_#88B04B_0%,_#6D8D3C_100%)]  rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <Target className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">For Brands</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Find authentic influencers who align with your values, 
                launch impactful campaigns, and measure ROI with precision.
              </p>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "Advanced influencer discovery",
                  "Campaign ROI tracking",
                  "Audience insights & analytics",
                  "Streamlined collaboration tools"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckIcon className="w-5 h-5 text-secondary-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Button className="bg-gradient-secondary text-white hover:shadow-lg transition-all duration-300">
                Start as Brand
              </Button>
            </motion.div>

            {/* Agencies */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">For Agencies</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Scale your influencer marketing operations with powerful 
                management tools and white-label solutions.
              </p>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "Multi-client campaign management",
                  "White-label platform options",
                  "Advanced reporting & insights",
                  "Team collaboration features"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckIcon className="w-5 h-5 text-accent-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Button className="bg-gradient-accent text-white hover:shadow-lg transition-all duration-300">
                Agency Solutions
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our community of influencers, brands, and agencies have to say about their experience with Amplyst.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[linear-gradient(135deg,_#3A7CA5_0%,_#88B04B_50%,_#E19629_100%)]  overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Amplify Your Success?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Join thousands of influencers, brands, and agencies who are already 
              transforming their marketing with Amplyst.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-primary-600 px-8 py-4 text-lg hover:bg-gray-100 transition-all duration-300"
                >
                  Get Started Free
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white px-8 py-4 text-lg hover:bg-white hover:text-primary-600 transition-all duration-300"
                >
                  Schedule Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(17_24_39_/var(--tw-bg-opacity,1))] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-[linear-gradient(135deg,_#3A7CA5_0%,_#2E6384_100%)] bg-clip-text text-transparent mb-4">
                Amplyst
              </div>
              <p className="text-gray-400 mb-4">
                The world's most advanced influencer marketing platform.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Globe className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Award className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">For Influencers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Brands</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Agencies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Amplyst. All rights reserved.
            </p>
            {/* <p className="text-gray-400">
              Made with ❤️ for the creator economy
            </p> */}
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {scrollY > 400 && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[linear-gradient(135deg,_#3A7CA5_0%,_#2E6384_100%)] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
    </div>
  );
}
