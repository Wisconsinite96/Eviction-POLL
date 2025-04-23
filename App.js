import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function PollApp() {
  const [pollName, setPollName] = useState("");
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [votes, setVotes] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pollId = params.get("pollId");
    if (pollId) {
      const saved = localStorage.getItem(`poll-${pollId}`);
      if (saved) {
        const data = JSON.parse(saved);
        setPollName(data.name);
        setOptions(data.options);
        setVotes(data.votes);
      }
    }
  }, []);

  useEffect(() => {
    if (pollName) {
      const id = pollName.toLowerCase().replace(/\s+/g, "-");
      localStorage.setItem(`poll-${id}`, JSON.stringify({ name: pollName, options, votes }));
    }
  }, [pollName, options, votes]);

  const addOption = () => {
    if (newOption.trim() && !options.includes(newOption)) {
      setOptions([...options, newOption]);
      setVotes({ ...votes, [newOption]: 0 });
      setNewOption("");
    }
  };

  const removeOption = (optionToRemove) => {
    const updatedOptions = options.filter(opt => opt !== optionToRemove);
    const updatedVotes = { ...votes };
    delete updatedVotes[optionToRemove];
    setOptions(updatedOptions);
    setVotes(updatedVotes);
  };

  const vote = (option) => {
    setVotes({ ...votes, [option]: votes[option] + 1 });
  };

  const pollId = pollName.toLowerCase().replace(/\s+/g, "-");
  const shareLink = `${window.location.origin}?pollId=${pollId}`;

  const chartData = options.map(option => ({ name: option, votes: votes[option] || 0 }));

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <motion.h1 className="text-2xl font-bold text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Create Your Poll
      </motion.h1>
      <Input
        className="mb-4"
        placeholder="Poll Name"
        value={pollName}
        onChange={(e) => setPollName(e.target.value)}
      />
      <div className="flex gap-2">
        <Input
          placeholder="Enter an option"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
        />
        <Button onClick={addOption}>Add</Button>
      </div>
      <div className="grid gap-4">
        {options.map((option) => (
          <Card key={option} className="flex justify-between items-center p-4">
            <CardContent className="text-lg font-medium flex-1">{option}</CardContent>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => vote(option)}>Vote ({votes[option] || 0})</Button>
              <Button variant="destructive" onClick={() => removeOption(option)}>Remove</Button>
            </div>
          </Card>
        ))}
      </div>
      {options.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="votes" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {pollName && (
        <div className="mt-4 text-center">
          <p className="mb-2">Share this poll:</p>
          <Input value={shareLink} readOnly onClick={(e) => e.target.select()} />
        </div>
      )}
    </div>
  );
}
