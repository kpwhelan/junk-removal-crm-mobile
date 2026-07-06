import { Alert, View } from 'react-native';
import { router } from 'expo-router';
import { AxiosError } from 'axios';

import CreateJobForm from '@/src/forms/jobs/CreateJobsForm';
import { createJob } from '@/src/services/jobs';
import { CreateJobFormValues } from '@/src/forms/jobs/createJobSchema';

function getCreateJobErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<{
    message?: string | string[];
    error?: string;
    statusCode?: number;
  }>;

  if (axiosError.response?.data?.message) {
    const message = axiosError.response.data.message;

    return Array.isArray(message) ? message.join('\n') : message;
  }

  if (axiosError.response?.status === 401) {
    return 'Your session expired. Please log in again.';
  }

  if (axiosError.response?.status === 403) {
    return 'You do not have permission to create jobs.';
  }

  if (axiosError.response?.status === 404) {
    return 'The jobs endpoint could not be found.';
  }

  if (axiosError.response?.status && axiosError.response.status >= 500) {
    return 'The server had a problem creating this job. Please try again.';
  }

  if (axiosError.request) {
    return 'Could not connect to the server. Please check your connection and try again.';
  }

  return 'Something went wrong creating the job.';
}

export default function NewJobScreen() {
  const handleCreateJob = async (values: CreateJobFormValues) => {
    try {
      const payload =
        values.customerMode === 'existing'
          ? {
              ...values.job,
              customerId: values.customerId,
            }
          : {
              ...values.job,
              customer: values.customer,
            };

      await createJob(payload);

      Alert.alert('Success', 'Job created successfully', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', getCreateJobErrorMessage(error));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CreateJobForm onSubmit={handleCreateJob} />
    </View>
  );
}