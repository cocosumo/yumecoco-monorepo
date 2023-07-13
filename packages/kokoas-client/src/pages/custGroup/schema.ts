import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());
