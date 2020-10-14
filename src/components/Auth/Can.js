import rules from "../../rbac-rules"

export const check = (role, action, data) => {
  const permissions = rules[role]
  if (!permissions) {
    return false
  }

  const staticPermissions = permissions.static

  if (staticPermissions && staticPermissions.includes(action)) {
    return true
  }

  const dynamicPermissions = permissions.dynamic

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action]
    if (!permissionCondition) {
      return false
    }

    return permissionCondition(data)
  }
  return false
}

const Can = props => {
  return check(props.role, props.perform, props.data) ? props.yes() : props.no()
}

Can.defaultProps = {
  yes: () => null,
  no: () => null
}

export default Can
