import { AGE_TEST_PROMPT } from "@/prompt/ageTestPrompt";
import { ageTest, saveAgeTest } from "@/services/ageTest";
import { SaveAgeTestResult } from "@/types/planAge";
import { useMutation } from "@tanstack/react-query";

interface AgeTestResultProps {
  userAge: string;
  resultAge: string;
}

const handleAgeTestMutation = async (message: string): Promise<AgeTestResultProps> => {
  const ageTestResult = await ageTest({ message: message, prompt: AGE_TEST_PROMPT });

  return ageTestResult;
};

const handleSaveAgeTest = async (result: SaveAgeTestResult): Promise<string> => {
  const response = await saveAgeTest(result);

  return response;
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

export const useSaveAgeTest = () => {
  return useMutation<string, Error, SaveAgeTestResult>({
    mutationKey: ["saveAgeTest"],
    mutationFn: handleSaveAgeTest,
    onError: (error) => {
      console.error(error);
    },
  });
};
