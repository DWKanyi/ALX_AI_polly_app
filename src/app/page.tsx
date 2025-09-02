"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart, Users, Share2, ShieldCheck, PlusSquare, Vote } from "lucide-react";

export default function HomePage() {
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center py-20 px-4 sm:px-6 lg:px-8"
      >
        <Vote className="w-24 h-24 mb-6 text-purple-400" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            ALX Polly
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
          Create, share, and vote on polls instantly. Get feedback from your
          friends, family, or community in a fun and interactive way.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/polls/create">
            <Button size="lg">Create a Poll</Button>
          </Link>
          <Link href="/polls/view">
            <Button size="lg" variant="outline">
              View Polls
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.1 }}>
              <PlusSquare className="w-16 h-16 mx-auto mb-4 text-pink-500" />
              <h3 className="text-xl font-semibold mb-2">1. Create</h3>
              <p className="text-gray-400">
                Easily create a poll with a title and multiple options.
              </p>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.2 }}>
              <Share2 className="w-16 h-16 mx-auto mb-4 text-pink-500" />
              <h3 className="text-xl font-semibold mb-2">2. Share</h3>
              <p className="text-gray-400">
                Share the poll with your audience via a unique link.
              </p>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.3 }}>
              <Vote className="w-16 h-16 mx-auto mb-4 text-pink-500" />
              <h3 className="text-xl font-semibold mb-2">3. Vote</h3>
              <p className="text-gray-400">
                Users can vote on the options, and you see the results in real-time.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.1 }}>
              <BarChart className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Real-time Results</h3>
              <p className="text-gray-400">
                Watch the results update live as votes come in.
              </p>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.2 }}>
              <Users className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-400">
                Engage with your community and gather valuable feedback.
              </p>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.3 }}>
              <Share2 className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
              <p className="text-gray-400">
                Share polls effortlessly with a simple link.
              </p>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.4 }}>
              <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-400">
                Your data is secure, and your polls are private.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}