import { AGE_TEST_PROMPT } from "@/prompt/ageTestPrompt";
import { ageTest } from "@/services/ageTest";
import { useMutation } from "@tanstack/react-query";

interface AgeTestResultProps {
  userAge: string;
  resultAge: string;
}

const handleAgeTestMutation = async (message: string): Promise<AgeTestResultProps> => {
  const ageTestResult = await ageTest({ message: message, prompt: AGE_TEST_PROMPT });

  return ageTestResult.item;
};

export const useAgeTestMutation = () => {
  return useMutation<AgeTestResultProps, Error, string>({
    mutationKey: ["ageTest"],
    mutationFn: handleAgeTestMutation,
    onError: (error) => {
      console.error(error);
    },
  });
};
