import React, { useState } from "react";
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, Checkbox, Text, HStack } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTasks = [...tasks, { id: Date.now(), text: input, isCompleted: false }];
      setTasks(newTasks);
      setInput("");
    }
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Container centerContent maxW="container.md" padding={4}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">
          To-Do List
        </Text>
        <HStack width="100%">
          <Input placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} />
          <IconButton aria-label="Add task" icon={<FaPlus />} onClick={handleAddTask} />
        </HStack>
        <List width="100%">
          {tasks.map((task) => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Checkbox isChecked={task.isCompleted} onChange={() => handleToggleTask(task.id)}>
                <Text as={task.isCompleted ? "del" : undefined}>{task.text}</Text>
              </Checkbox>
              <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} size="sm" />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
