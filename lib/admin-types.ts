export interface UserAdminDisplay {
  index: number
  id: string
  email: string
}

export type Column = {
  header: string
  accessor: keyof UserAdminDisplay
}
