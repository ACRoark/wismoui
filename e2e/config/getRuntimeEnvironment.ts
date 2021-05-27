const getRuntimeEnvironment = (): string => {
  const preview = process.argv.includes('--preview') ? 'PREVIEW' : '';
  const prod = process.argv.includes('--prod') ? 'PROD' : '';
  const qa = process.argv.includes('--qa') ? 'QA' : '';

  const environment = preview || prod || qa || 'DEV';

  return environment;
};

export default getRuntimeEnvironment;
