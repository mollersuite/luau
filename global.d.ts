/// <reference types="@sveltejs/kit" />
/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface Locals {
    exploit: string | false
  }

  interface Platform {}

  interface Session {
    exploit: string | false
  }

  interface Stuff {}
}
