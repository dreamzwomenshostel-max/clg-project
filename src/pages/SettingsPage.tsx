import { motion } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/context/ThemeContext';
import { useApp } from '@/context/AppContext';
import { Settings, Moon, Bell, Globe, Shield, KeyRound, Trash2, ChevronRight, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useApp();

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon={<Settings className="w-6 h-6" />} title="Settings" subtitle="Manage your preferences and account." />

      <div className="space-y-4">
        <SettingGroup title="Appearance">
          <SettingRow icon={Moon} label="Dark Mode" desc="Switch between light and dark themes">
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </SettingRow>
        </SettingGroup>

        <SettingGroup title="Notifications">
          <SettingRow icon={Bell} label="Push Notifications" desc="Daily reminders and updates">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow icon={Bell} label="Email Updates" desc="Weekly progress reports">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow icon={Bell} label="Assignment Reminders" desc="Deadline alerts">
            <Switch defaultChecked />
          </SettingRow>
        </SettingGroup>

        <SettingGroup title="Preferences">
          <SettingRow icon={Globe} label="Language" desc="English (India)" chevron />
          <SettingRow icon={Shield} label="Privacy" desc="Manage your data and visibility" chevron />
        </SettingGroup>

        <SettingGroup title="Security">
          <SettingRow icon={KeyRound} label="Change Password" desc="Update your password" chevron />
          <SettingRow icon={Shield} label="Two-Factor Authentication" desc="Add an extra layer of security">
            <Switch />
          </SettingRow>
        </SettingGroup>

        <SettingGroup title="Account">
          <SettingRow icon={LogOut} label="Logout" desc="Sign out of your account" onClick={logout} chevron />
          <SettingRow icon={Trash2} label="Delete Account" desc="Permanently remove your account and data" danger chevron />
        </SettingGroup>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">CareerOS AI v1.0.0 · Made with care</p>
    </div>
  );
}

function SettingGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">{title}</p>
      <GlassCard className="overflow-hidden" hover={false}>
        {children}
      </GlassCard>
    </motion.div>
  );
}

function SettingRow({ icon: Icon, label, desc, children, chevron, danger, onClick }: { icon: any; label: string; desc: string; children?: React.ReactNode; chevron?: boolean; danger?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors text-left">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${danger ? 'bg-destructive/10' : 'bg-primary/10'}`}>
        <Icon className={`w-4 h-4 ${danger ? 'text-destructive' : 'text-primary'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${danger ? 'text-destructive' : ''}`}>{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      {children}
      {chevron && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
    </button>
  );
}
