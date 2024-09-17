import { Button, Input, Label } from '@/components/shared';

function ManageAccount() {
  return (
    <div className="grid gap-6 py-6">
      <h1 className="font-bold text-2xl">Delete my account forever</h1>
      <div className="grid gap-6 w-full max-w-lg">
        <div className="grid gap-2">
          <p className="font-medium">Account deactivation means to delete our account:</p>
          <p>
            You will not be able to log in to our profile , anumore and all our account historv will
            be deleted without the possibility to restore
          </p>
        </div>

        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="reason" className="font-medium">
              Tell us why
            </Label>
            <Input id="reason" />
          </div>
          <Button variant={'destructive'} className="w-full">
            Delete my account forever
          </Button>
        </form>
      </div>
    </div>
  );
}

export { ManageAccount };
