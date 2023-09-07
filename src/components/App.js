import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [showStatistics, setShowStatistics] = useState(false);

  const onLeaveFeedback = feedback => {
    switch (feedback) {
      case 'good':
        setGood(prev => prev + 1);
        setShowStatistics(true);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        setShowStatistics(true);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        setShowStatistics(true);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () =>
    countTotalFeedback() === 0
      ? 0
      : ((good / countTotalFeedback()) * 100).toFixed(2);

  const title = 'Please leave feedback';

  return (
    <Layout>
      <GlobalStyle />
      <Section title={title}>
        <FeedbackOptions onLeaveFeedback={onLeaveFeedback} />
        {showStatistics ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback}
            positiveFeedbackPercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is not feedback" />
        )}
      </Section>
    </Layout>
  );
};
