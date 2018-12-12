import requests
import urllib

def ping_project(project):
    """
        Returns a dictionary
    """
    url = urllib.parse.urlunparse((
        'https',
        'www.mec.ca',
        '/'.join(['/en/status', project]),
        None,
        '',
        ''
    ))

    response = requests.get(url)
    if response.status_code != 200:
        print(f'Recieved a {response.status_code} from {url}: {response.text}')
        return {
            project: 'Not OK',
        }

    return response.json()


def db_and_mq():
    db_ping = ping_project('db')
    mq_ping = ping_project('mq')

    return {
        'database': db_ping['database'],
        'mq': mq_ping['mq'],
    }
