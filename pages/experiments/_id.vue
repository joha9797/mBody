<template lang="pug">
  v-container.experiment(fluid="", v-if="experiment", ref="experiment")
    .subjinfo SubjectID: {{subject.id}}, PIN: {{subject.pin}}
    v-row
      component(:is="actScreen.type", v-bind="actScreen.data", v-model="screenModel", v-on:change-subject="changeSubject", v-on:completed="next")
    p.debug(v-if="debug") {{screenModel}}
    .actions
      v-btn.button(@click="next") {{actScreen.data.btnText}}
  .jcenter.container.justify-center.align-center(v-else, fluid="")
      h1.text-center No experiment id given or experiment not found.
</template>

<script>
import experiments from '~/experiments/index.js'

export default {
  data() {
    return {
      act: 0,
      subject: this.$getSubject(),
      screenModel: {},
      debug: false,
    };
  },
  computed: {
    expId() {
      // Get experiment ID from routing parameters
      const expId = this.$route.params.id
      // this.$log.debug(`expID: ${expId}`)
      return expId
    },

    meta() {
      // Get Metadata from query
      return this.$route.query || {}
    },

    experiment() {
      // Create new Instance of Experiment using expID and metadata
      const ExperimentClass = experiments[this.expId]
      const exp = new ExperimentClass(this.meta)
      // this.$log.debug(`exp: ${JSON.stringify(exp)}`)
      return exp
    },

    // active screen
    actScreen() {
      return this.experiment.screens[this.act] || {}
    },
    // button text
    btnText() {
      return this.actScreen.data.btnText || "Weiter"
    },
  },
  methods: {
    // transition to next screen
    next() {
      this.saveScreen()
      if (this.act < this.experiment.screens.length-1) {
        this.act +=1
      } else if (this.act == this.experiment.screens.length-1) {
        this.$router.push({path: "/"})
      }
      this.initModel()
    },
    // transition to previous screen
    prev() {
      this.saveScreen()
      if (this.act > 0) {
        this.act -=1
      } 
      this.initModel()
    },
    // initialize and clear the screen data
    initModel() {
      this.screenModel = this.actScreen.data.model || {}
    },
    saveScreen() {
      // If a screen gives back a subject, set it as experiment subject
      if (this.screenModel && this.screenModel.subject) {
        this.subject = this.screenModel.subject
      }
      // collect result
      const res = {
        expId: this.experiment.id,
        screenId: this.actScreen.id,
        subjectId: this.subject.id,
        saved: new Date(),
        data: this.screenModel,
        meta: this.meta
      }
      // save it to database
      this.$log.debug(' SAVE TO DATABASE: ', res)
      this.experiment.screenSubmitted(res)
    },
    changeSubject(subj) {
      this.subject = subj
    },
    checkExperiment() {
      // check if ervery screen has an id

      // check if ids are unique

    },
  },

};
</script>

<style lang="scss" scoped>
.jcenter {
  display: flex;
  align-items: center;
  height: 100%;
}
.exp-page {
  height: 100%s;
}
.experiment { 
  display: grid;
  grid-template-rows: 1.2rem minmax(0, 1fr) 60px;
  height: 100%;
}

.subjinfo {
  font-size: 0.9rem;
  text-align: right;
  width: 100%;
}

.actions {
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex
}

.button {
  max-width: 50%;
}

.fullWidth {
  width: 100%;
}

.debug {
  border: 1px dotted green;
  overflow: scroll;
}
</style>