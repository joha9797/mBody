import Experiment from '~/lib/Experiment'

import ChooseParticipant from '@/components/elements/screens/ChooseParticipant'
import InfoScreen from '@/components/elements/screens/InfoScreen'
import Questionaire from '@/components/elements/screens/Questionaire'
import BodyFrontBack from '@/components/elements/screens/BodyFrontBack'
import BodySingle from '@/components/elements/screens/BodySingle'
import BodyActDeact from '@/components/elements/screens/BodyActDeact'

import BaseQuestionnaire from './questionnaires/BaseQuestionnaire'

export default class mBodyDemoExperiment extends Experiment {
  id = "mbody-demo"
  title = "mBody Demo"
  description = "A demonstration of the mBody screens"
  screens = [
    {
      type: ChooseParticipant,
      id: "participant",
      data: {
        btnText: "Anonym fortfahren"
      }
    },
    {
      type: InfoScreen,
      id: "welcome",
      data: {
        title: "Einführung",
        description: "Dies ist ein Beispielexperiment",
        btnText: "Weiter"
      }
    },
    {
      type: Questionaire,
      id: "basic",
      data: {
        title: "Basisdaten",
        description: "Dieser Fragebogen erfasst Basisdaten.",
        schema: BaseQuestionnaire,
        model: { treatment: {} },
        options: {},
        btnText: "Weiter"
      }
    },
    {
        
      type: BodyFrontBack,
      id: "twoside",
      data: {
        title: "Einführung",
        description: "Man kann auf der Vorder- und Rückseite markieren.",
        btnText: "Weiter"
      }
    },
    {
      
},    
]
}