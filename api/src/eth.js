const ethUtil = require('ethereumjs-util')
const sigUtil = require('eth-sig-util')
const Web3EthContract = require('web3-eth-contract')
const KERNEL_ABI = require('../abis/kernel.json')

const PROFILE_PREFIX = 'PROFILE_DATA'
export function composeMessage (prefix, obj) {
  return `${prefix}${JSON.stringify(obj, Object.keys(obj).sort())}`
}

export function addressEqual (a, b) {
  return ethUtil.toChecksumAddress(a) === ethUtil.toChecksumAddress(b)
}

export function validateSignerAddress (
  originalMessage,
  signedMessage,
  signerAddress
) {
  const encodedMessage = ethUtil.bufferToHex(
    Buffer.from(originalMessage, 'utf8')
  )
  const recoveredAddress = sigUtil.recoverPersonalSignature({
    data: encodedMessage,
    sig: signedMessage
  })

  return addressEqual(recoveredAddress, signerAddress)
}

const MANAGE_PROFILE_ROLE = '0x675b358b95ae7561136697fcc3302da54a334ac7c199d53621288290fb863f5c'
const EMPTY_SCRIPT = '0x00'
export async function validatePermission (
  orgAddress,
  subjectAddress
) {
  Web3EthContract.setProvider(process.env.ETH_NODE)
  const kernelContract = new Web3EthContract(KERNEL_ABI, orgAddress)

  try {
    const hasPermission = await kernelContract.methods.hasPermission(
      subjectAddress,
      orgAddress,
      MANAGE_PROFILE_ROLE,
      EMPTY_SCRIPT
    ).call()

    return hasPermission
  } catch (_) {
    return false
  }
}
