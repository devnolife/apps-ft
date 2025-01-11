/* eslint-disable react-hooks/rules-of-hooks */
import useGraphql from './useApiGraphql'

const { query } = useGraphql()

export function syaratKkp(params) {
  return query(`
    query GetAllKkpSyarat {
      getAllKkpSyarat {
       ` + params + `
      }
    }
  `)
}

