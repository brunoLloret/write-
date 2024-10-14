import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@/components/base";
import "App.css";

interface Exercise {
  id: number;
  content: string;
}

const App = () => {
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState("");
  const [timer, setTimer] = useState(0);

  const instructions = [
    "Write the story as if you were sharing it with someone else without prejudices, just for the sake of having fun sharing a story that you want to write, even if you don't have total clarity.",
    "Now that you're back, write again the story as if you were sharing it with someone else. Don't put attention on whether you are repeating yourself or whether you are expanding the previous exercise. For now, forget about the previous exercise and that you wrote something, and focus on sharing the story again with someone else.",
    "Amazing! Now take some time away from the screen and come back in a while. Now that you're back, write again the story as if you were sharing it with someone else. Don't put attention on whether you are repeating yourself or whether you are expanding the previous exercise. For now, forget about the previous exercise and that you wrote something, and focus on sharing the story again with someone else.",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleStartExercise = () => {
    setTimer(15 * 60); // 15 minutes
  };

  const handleSubmitExercise = () => {
    if (currentExercise.trim()) {
      setExercises([
        ...exercises,
        { id: exercises.length + 1, content: currentExercise },
      ]);
      setCurrentExercise("");
      setCurrentInstructionIndex((prevIndex) =>
        prevIndex < instructions.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h1" className="mb-4">
        Story Draft App
      </Typography>

      <Typography variant="body1" className="mb-4">
        {instructions[currentInstructionIndex]}
      </Typography>

      {timer > 0 ? (
        <div className="mb-4">
          <Typography variant="body2">
            Time remaining: {Math.floor(timer / 60)}:
            {(timer % 60).toString().padStart(2, "0")}
          </Typography>
        </div>
      ) : (
        <Button onClick={handleStartExercise} className="mb-4">
          Start Exercise
        </Button>
      )}

      <TextField
        multiline
        rows={6}
        value={currentExercise}
        onChange={(e) => setCurrentExercise(e.target.value)}
        placeholder="Write your story here..."
        className="w-full mb-4"
      />

      <Button
        onClick={handleSubmitExercise}
        disabled={timer > 0 || !currentExercise.trim()}
      >
        Submit Exercise
      </Button>

      <div className="mt-8">
        <Typography variant="h2" className="mb-2">
          Previous Exercises
        </Typography>
        {exercises.map((exercise) => (
          <Typography key={exercise.id} variant="body1" className="mb-2">
            Exercise {exercise.id}: {exercise.content.substring(0, 50)}...
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default App;
