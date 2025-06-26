import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'demo-key',
  dangerouslyAllowBrowser: true
});

interface VerificationResult {
  verificationStatus: string;
  confidenceScore: number;
  reasoning: string;
  citations: string[];
  redFlags?: string[];
}

export async function summarizeAndStrategize(verificationResult: VerificationResult) {
  try {
    console.log('Generating strategy for verification result');

    // If no API key is configured, return mock data
    if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'demo-key') {
      return generateMockStrategy(verificationResult);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a strategic advisor for information integrity. Based on verification results, create actionable strategies.

Generate a response in JSON format:
{
  "summary": "Clear 2-sentence summary of the core issue",
  "actionSteps": [
    "Specific actionable step 1",
    "Specific actionable step 2",
    "Specific actionable step 3",
    "Specific actionable step 4"
  ],
  "priorityLevel": "low|medium|high|critical",
  "timeframe": "immediate|short-term|long-term",
  "stakeholders": ["stakeholder1", "stakeholder2"]
}`
        },
        {
          role: "user",
          content: `Create a strategy based on this verification result:
Status: ${verificationResult.verificationStatus}
Confidence: ${verificationResult.confidenceScore}%
Reasoning: ${verificationResult.reasoning}
Red Flags: ${verificationResult.redFlags?.join(', ') || 'None'}`
        }
      ],
      temperature: 0.4,
      max_tokens: 800
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    try {
      const strategy = JSON.parse(response);
      return {
        summary: strategy.summary,
        actionSteps: strategy.actionSteps || [],
        priorityLevel: strategy.priorityLevel || 'medium',
        timeframe: strategy.timeframe || 'short-term',
        stakeholders: strategy.stakeholders || []
      };
    } catch (parseError) {
      console.error('Error parsing strategy response:', parseError);
      return generateMockStrategy(verificationResult);
    }

  } catch (error) {
    console.error('Strategy generation error:', error);
    return generateMockStrategy(verificationResult);
  }
}

function generateMockStrategy(verificationResult: VerificationResult) {
  const { verificationStatus, confidenceScore } = verificationResult;

  const strategies = {
    'false': {
      summary: "False information detected with high confidence. Immediate action required to prevent spread and correct misinformation.",
      actionSteps: [
        "Flag content for review and potential removal",
        "Notify relevant fact-checking organizations",
        "Prepare corrective information with credible sources",
        "Monitor for additional instances of this misinformation"
      ],
      priorityLevel: 'critical' as const,
      timeframe: 'immediate',
      stakeholders: ['Content moderators', 'Fact-checkers', 'Platform administrators']
    },
    'mixed': {
      summary: "Content contains both accurate and misleading elements. Requires nuanced approach to address inaccuracies while preserving valid information.",
      actionSteps: [
        "Add contextual information to clarify misleading aspects",
        "Provide additional sources for verification",
        "Engage with content creator for clarification",
        "Monitor public response and engagement patterns"
      ],
      priorityLevel: 'high' as const,
      timeframe: 'short-term',
      stakeholders: ['Editorial team', 'Subject matter experts', 'Community managers']
    },
    'unverified': {
      summary: "Claims require additional investigation due to insufficient evidence. Approach with caution until verification is complete.",
      actionSteps: [
        "Conduct deeper research using additional sources",
        "Consult with domain experts for specialized knowledge",
        "Implement temporary content labeling pending verification",
        "Establish timeline for follow-up investigation"
      ],
      priorityLevel: 'medium' as const,
      timeframe: 'short-term',
      stakeholders: ['Research team', 'Domain experts', 'Editorial oversight']
    },
    'true': {
      summary: "Information appears accurate based on current verification. Continue monitoring for any new developments or contradictory evidence.",
      actionSteps: [
        "Maintain regular monitoring for updates",
        "Ensure sources remain credible and current",
        "Document verification process for future reference",
        "Share verification results with relevant stakeholders"
      ],
      priorityLevel: 'low' as const,
      timeframe: 'long-term',
      stakeholders: ['Content team', 'Quality assurance', 'Archive managers']
    }
  };

  const strategy = strategies[verificationStatus as keyof typeof strategies] || strategies['unverified'];

  // Adjust priority based on confidence score
  if (confidenceScore < 70 && strategy.priorityLevel === 'critical') {
    strategy.priorityLevel = 'high';
  }

  return strategy;
}