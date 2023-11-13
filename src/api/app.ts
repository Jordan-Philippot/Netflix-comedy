import { SavedTrackType } from "./track.type";

const BASE_URL = process.env.REACT_APP_API_URL

export const getDefaultConfig = () => ({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer BQC4uzixu-S2uJrDIVQSGv2FR-M4VFhwBMPQZ83NqJwgu_3PwTVjK1sWZQhxYrHa4e3zy6Ie5v9GlECuScuKuF_ONYWMJdZzq2pBYZDhN6dDJwYhAjn4bhWBbDx4BxOfR9jbPIu8gFIaAG-wifgZBTX9xWdi4cglMWQ9jmyGBJA5x1x2QvrVJ94qCLfW83f4SKxeB3qKBpFdz3azGsEJJIKWfNlI6xzBHf3woqGb7iKzCTVAJc608pB-AGZwrDnYaLd5oPgmTadtG8q80RQNAG8YK5Z3g0JSmCST70XmXroVSHe5`,
    },
})

export const getSavedTrackList = async (): Promise<SavedTrackType[]> => {
    const response = await fetch(`${BASE_URL}me/tracks`, getDefaultConfig())
    const data = await response.json();
    return data.items
}

