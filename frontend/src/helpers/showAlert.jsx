import React from 'react'
import AlertBox from '../components/AlertBox'
import { useState } from 'react'

class AlertAction {
    showAlert() {
        return <AlertBox />
    }
    hideAlert() {
        return null
    }
}


export default AlertAction