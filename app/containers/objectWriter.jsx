import React from 'react'
import PropTypes from 'prop-types'
import ContractWriter from '../utils/contractWriter'
import SetPremisObject from './setPremisObject'
import SetPremisAgent from './setPremisAgent'
import SetPremisRights from './setPremisRights'
import SetPremisEvent from './setPremisEvent'
import PremisObjectHandler from '../utils/premisObjectHandler'
import PremisRightsHandler from '../utils/premisRightsHandler'
import PremisEventHandler from '../utils/premisEventHandler'
import PremisAgentHandler from '../utils/premisAgentHandler'
import {ObjectWriterStrings} from '../utils/outputStrings'
import {FormSubmit} from '../components/premis'

class ObjectWriter extends React.Component {

  constructor (props) {
    super(props)

    this.premisObjectHandler = new PremisObjectHandler()
    this.premisEventHandler = new PremisEventHandler()
    this.premisAgentHandler = new PremisAgentHandler()
    this.premisRightsHandler = new PremisRightsHandler()

    this.contractWriter = new ContractWriter(this.props.web3, this.props.contracts)

    this.state = {
      render: false
    }
  }

  _checkFieldsSet() {
    if ((this.premisRightsHandler.checkSet()) &&
        (this.premisObjectHandler.checkSet()) &&
        (this.premisEventHandler.checkSet()) &&
        (this.premisAgentHandler.checkSet())) {
      return true
    } else {
      return false
    }
  }

  _resetData() {
    this.premisRightsHandler.reset()
    this.premisObjectHandler.reset()
    this.premisEventHandler.reset()
    this.premisAgentHandler.reset()
  }

  _render() {
    // This is an attempt to reset input fields - not currently working :(
    //
    // console.log(this.state.render)
    const render = !(this.state.render)
    this.setState({render: render})
    // console.log(this.state.render)
  }

  _sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async _checkWrite () {
    const wait = 1000
    const numTransactions = this.contractWriter.getNumTransactions()
    let numWrites = 0
    while (numWrites < numTransactions) {
      this.props.messageFunc(ObjectWriterStrings.writing)
      await this._sleep(wait)
      numWrites = this.contractWriter.getNumWrites()
    }

    this.props.messageFunc(ObjectWriterStrings.finishedWriting)
    this._resetData()
    this._render()
  }

  _blockchainWriter (_self, _result) {
    // console.log('in blockchain writer')
    _self.waitingToWrite = false
    _self.numWrites += 1
  }

  _setKeys() {
    const account = this.props.web3.getAccount()
    this.premisObjectHandler.setHash(this.props.hash)
    this.premisEventHandler.setId(account)
    this.premisAgentHandler.setId(account)
    this.premisRightsHandler.setId()
  }

  handleObjectData (objectData) {
    this.objectData = objectData
  }

  handleEventData (eventData) {
    this.eventData = eventData
  }

  handleAgentData (agentData) {
    this.agentData = agentData
  }

  handleRightsData (rightsData) {
    this.rightsData = rightsData
  }

  handleSubmit () {
    this._setKeys()
    if (this._checkFieldsSet()) {
      this.props.messageFunc(ObjectWriterStrings.submitting)
      this._checkWrite()
      this.contractWriter.resetData()
      this.contractWriter.setData(this.premisObjectHandler, this.premisEventHandler, this.premisAgentHandler, this.premisRightsHandler)
      this.contractWriter.dispatcher()
    } else {
      this.props.messageFunc(ObjectWriterStrings.completeAll)
    }
  }

  render () {
    return (
      <div>
        <SetPremisObject objectHandler={this.premisObjectHandler} contractWriter={this.contractWriter} />
        <hr />
        <SetPremisEvent eventHandler={this.premisEventHandler} contractWriter={this.contractWriter} />
        <hr />
        <SetPremisAgent agentHandler={this.premisAgentHandler} />
        <hr />
        <SetPremisRights rightsHandler={this.premisRightsHandler} />
        <hr />
        <FormSubmit parentFunc={this.handleSubmit.bind(this)} label={ObjectWriterStrings.submitObjectLabel} tip={ObjectWriterStrings.submitObjectTip} />
      </div>
    )
  }
}

ObjectWriter.propTypes = {
  messageFunc: PropTypes.func,
  hash: PropTypes.string,
  contracts: PropTypes.object,
  web3: PropTypes.object
}

export default ObjectWriter
