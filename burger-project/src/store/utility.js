export const updateObject = (oldObj, newProperties) => {
    return {
        ...oldObj,
        ...newProperties
    }
}