export default function( url ) {
  const tagRule = /^data:.+?\/.+?;base64,/
  return tagRule.test( url )
}