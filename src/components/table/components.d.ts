export interface Child {
  setShow(val: boolean): void
  name: string
  label: string
}

export type SetChildrenInstance = (child: Child) => void

export interface slotProps {
  label: string
  name: string
}

export interface retSlot {
  props: slotProps
  type: {
    name: String
  }
}
