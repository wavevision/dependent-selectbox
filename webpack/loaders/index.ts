import { RuleSetRule } from 'webpack';

import scripts from './scripts';

export default (): RuleSetRule[] => [...scripts()];
