#!/usr/local/bin/python3
import json
import slack
import coverage
import lint
import ping

class Frame:
    def __init__(self, conf):
        self.id = conf['id']
        self.title = conf['title']
        try:
            self.desc = conf['desc']
        except KeyError:
            self.desc = ''
        try:
            self.populator = conf['populator']
        except KeyError:
            self.populator = None
        self.update_req = 'never'
        self.data = {}

    def long_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'data': self.data,
        }

    def short_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'desc': self.desc,
        }

    def populate(self, frames, services):
        if self.populator == 'frames':
            self.data = {
                'frames': [ x.short_dict() for x in frames ],
            }
        if self.populator == 'services':
            self.data = services[self.id]

        if self.populator == 'slack.get_user':
            self.data = slack.get_user(services[self.id]['id'])

        if self.populator == 'cover/lint':
            self.data = {
                'coverage': coverage.get_coverage(),
                'lint': lint.get_linting(),
            }

        if self.populator == 'pinger':
            self.data = ping.db_and_mq()

        return self



def get_frames():
    # Open and parse the frame information
    with open('./data.json') as f:
        data = json.load(f)

        # Create all the frame objects
        frames = [ Frame(x) for x in data['frames'] ]

        # Now we populate them with data
        frames = [ x.populate(frames, data['services']) for x in frames ]

        return [ x.long_dict() for x in frames ]


if __name__ == "__main__":
    output = api()

    print(output)
