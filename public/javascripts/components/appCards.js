const app = Vue.createApp({});

app.component('app-card', {
  props: ['apps'],

  template: `
  <div v-for="app in apps" class="col col-lg-4 col-md-6 col-12" onclick="location.href='/brand/{{ app._id }}';">
    <div :class="'card-body ' + app.category.lightColor + ' d-flex'">
      <img class="app-logo" :src="app.image">
      <div>
        <h2>{{ app.name }}</h2>
        <p class="app-slogan">{{ app.slogan }}</p>
        <div :class="'badge rounded-pill text-light ' + app.category.darkColor">{{ app.category.name }}</div>
      </div>
    </div>
  </div>`
});
