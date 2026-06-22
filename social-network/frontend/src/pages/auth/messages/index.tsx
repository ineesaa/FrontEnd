import { Card } from '../../../components/ui/Card'

export const Messages = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-[#3a5a6e]" style={{ fontFamily: "'Georgia', serif" }}>Messages</h1>
      <p className="text-sm text-[#8aabbf]">Your conversations</p>
    </div>
    <Card>
      <div className="flex flex-col items-center py-10 gap-3">
        <span className="text-5xl">💬</span>
        <p className="text-sm text-[#8aabbf]">No messages yet.</p>
      </div>
    </Card>
  </div>
)