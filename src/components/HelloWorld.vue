<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
// import rust from '#/hello-wasm/pkg/hello_wasm.js';
const rust = import('#/hello-wasm/pkg');

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted () {
	setTimeout(() => {
		console.log(rust);
		rust
			.then(m => m.greet('World!'))
			.catch(console.error);
	}, 500);
  }
}
</script>
