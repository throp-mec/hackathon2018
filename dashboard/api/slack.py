import urllib
import json
import requests


SLACK_TOKEN = 'xoxp-2151638814-392034368673-498095644645-ad4f4437abc5cd6ab26c2c05459b49f9'

def get_slack_url(method, params):
    """
        Returns a dictionary
    """
    url = urllib.parse.urlunparse((
        'https',
        'slack.com',
        '/'.join(['api', method]),
        None,
        urllib.parse.urlencode(params),
        ''
    ))

    response = requests.get(url)
    if response.status_code != 200:
        logging.info(f'Recieved a {response.status_code} from {url}: {response.text}')
        raise Exception(f'Received a {response.status_code} from {url}')

    return response.json()


def get_user_presence(user_id):
    presence = get_slack_url('users.getPresence', {
        'token': SLACK_TOKEN,
        'user': user_id,
    })
    return presence['presence']


def get_user(user_id):

    print(f"getting user id: {user_id}")
    userInfo = get_slack_url('users.profile.get', {
        'token': SLACK_TOKEN,
        'user': user_id,
    })

    return {
        'name': userInfo['profile']['first_name'],
        'handle': userInfo['profile']['display_name'],
        'image': userInfo['profile']['image_72'],
        'presence': get_user_presence(user_id),
    }
