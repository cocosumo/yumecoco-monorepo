
type TFormStatus = 'busy' | 'disabled' | '';

interface URLParams {
  projId?: string
  projEstimateId?: string,
  custGroupId?: string,
  menuOpen?: number,
  invoiceId?: number,
}

type KeyOfUrlParams = keyof URLParams;

