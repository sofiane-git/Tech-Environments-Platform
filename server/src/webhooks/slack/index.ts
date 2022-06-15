import { IncomingWebhook } from '@slack/webhook';
import { SLACK_WEBHOOK_URL } from '../../config'

export const url = SLACK_WEBHOOK_URL;

export const webhookUrl = new IncomingWebhook(url);



export const slackBodyFree = (envName: string | undefined, email: string | undefined, url: string | undefined, ImageUrl: string | undefined) => (
  {
    "text": "Environnement libéré",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":white_check_mark: *Environnement libéré !*"
        }
      },
      {
        "type": "section",
        "block_id": "section567",
        "text": {
          "type": "mrkdwn",
          "text": `@channel \n ${ email } vient juste de libérer *_${ envName }_* \n \n Pour consulter l'ensemble des disponibilités : <${url}|Cliquez ici>`
        },
        
        "accessory": {
          "type": "image",
          "image_url": `${ ImageUrl }`,
          "alt_text": `${ envName }`
        }
      },
      
    ]
}
)

export const slackBodyBusy = (envName: string | undefined, email: string | undefined, url: string | undefined, ImageUrl: string | undefined) => (
  {
    "text": "Environnement occupé",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":rotating_light: *Environnement occupé* !"
        }
      },
      {
        "type": "section",
        "block_id": "section567",
        "text": {
          "type": "mrkdwn",
          "text": `@channel \n ${ email } utilise *_${ envName }_* \n \n Pour consulter l'ensemble des disponibilités : <${url}|Cliquez ici>`
        },
        "accessory": {
          "type": "image",
          "image_url": `${ ImageUrl }`,
          "alt_text": `${ envName }`
        }
      },
      
    ]
}
)

